//const host    = "http://localhost:3000/api/v1"
const host  = "https://quantself-1701.herokuapp.com/api/v1"

$(document).ready(() => {
  getFoods()
  getMeal("Breakfast")
  getMeal("Lunch")
  getMeal("Dinner")
  getMeal("Snacks")
  filterTable('meals-foods-table', 0)
  deleteMealLog()
  caclculateAll()
  addFoodToMeal()
})


function caclculateAll() {
  calculateMealTotal('Breakfast')
  calculateMealTotal('Lunch')
  calculateMealTotal('Dinner')
  calculateMealTotal('Snacks')
  calculateMealRemaining('Breakfast', 400)
  calculateMealRemaining('Lunch', 600)
  calculateMealRemaining('Dinner', 800)
  calculateMealRemaining('Snacks', 200)
  calculateCaloriesConsumed()
  calculateRemainingCalories()
}


function getFoods() {
  return jQuery.get(`${host}/foods`)
  .done(displayFoods)
  .fail((error) => console.log(error))
}

function displayFoods(foods) {
  for(let i = 0; i < foods.length; i++) {
    let id        = foods[i].id
    let name      = foods[i].name
    let calories  = foods[i].calories
    let status    = foods[i].food_status
    if (status == "active"){
      appendRow(id, name, calories, 'meals-foods-table', 'checkbox')
    }
  }
}

function getMeal(name) {
  var meal = jQuery.get(`${host}/meals/${name}`)
  .done(displayMeal.bind(meal, name))
  .fail((error) => console.log(error))
}

function displayMeal(meal, foods) {
  for(let i = 0; i < foods.length; i++) {
    let id        = foods[i].id
    let name      = foods[i].name
    let calories  = foods[i].calories
    let status    = foods[i].food_status
    appendRow(id, name, calories, `${meal}`, 'delete' )
  }
}

function appendRow(id, name, calories, table, inputType) {
  let button = addInputs(inputType)
  const row    = `<tr class='table-row'><td id="${id}-food-id">${name}</td><td class = "calories" id="calories-column">${calories}</td><td>${button}<td></tr>`
  $(`#${table}`).prepend(row)
}

function addInputs(type) {
  if (type === "checkbox") {
    return '<input type="checkbox"/>'
  } else if (type === "delete") {
    return '<button class="delete-button" type="button" name="Delete"></button>'
  } else {
    return ""}
}

function deleteMealLog() {
  $(document).click('button', function(event) {
    if (event.target.className === "delete-button") {
      let tr    = event.target.parentElement.parentElement
      let name  = tr.id
      let meal_id = tr.offsetParent.getAttribute('data-id')
      let food_id = tr.firstChild.id[0]
      tr.remove()
      removeMealLogFromDatabase(meal_id, food_id)
      caclculateAll()
    }
  })
}

function removeMealLogFromDatabase(meal_id, food_id) {
  return $.ajax({
    url: `${host}/meal_logs/?meal_id=${meal_id}&food_id=${food_id}`,
    method: 'DELETE'
  })
  .done()
  .fail((error) => {
    console.log("Couldn't remove this food from meal")
    console.log(error)
  })
}

function addFoodToMeal() {
  $('.add-meal-buttons input').on('click', function(event) {
    $("input:checked").each(function(index, checkbox) {
      let meal_id = event.target.getAttribute('data-id')
      let tr = checkbox.parentElement.parentElement
      let food_id = tr.firstChild.id[0]
      let food_name = tr.firstChild.innerText
      let calories = checkbox.parentElement.previousSibling.innerText
      let table = event.target.value
      postMealLog(meal_id, food_id)
      uncheckAll()
      appendRow(food_id, food_name, calories, table, "delete")
      caclculateAll()
    })
  })
}

function uncheckAll(){
  $('input:checkbox').each(function () {
     $(this).attr('checked', false);
   });
}

function postMealLog(meal_id, food_id) {
  return $.ajax({
    url: `${host}/meal_logs/?meal_id=${meal_id}&food_id=${food_id}`,
    method: 'POST',
  })
  .done()
  .fail((error) => {
    console.log("Couldn't add this food to meal")
    console.log(error)
  })
}

function filterTable(table_id, column_index) {
  var input  = document.getElementById("search-input")
  var filter = input.value.toLowerCase()
  var table  = document.getElementById(table_id)
  var tr     = table.getElementsByTagName("tr")
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[column_index]
    if (td) {
      var match = td.innerHTML.toLowerCase().indexOf(filter)
      tr[i].style.display =  (match > - 1) ? "" : "none"
    }
  }
}

function calculateMealTotal(mealID) {
  setTimeout(function() {
    let total = 0
    let derp  = $(`#${mealID} .calories`)
    derp.each(function(index, calories) {
      let number = calories.innerHTML
      total += parseInt(number)
    })
    $(`#${mealID} .total-calories-column`).text(total)
  }, 100);
}

function calculateMealRemaining(mealID, goalForMeal) {  // mealID, goalForMeal
  setTimeout(function() {
    let mealTotal   = $(`#${mealID} .total-calories-column`).text()
    let remaining   = goalForMeal - parseInt(mealTotal)
    let derp        = $(`#${mealID} .remaining-calories-column`)
    let remaining_cell    = $(`.remaining-calories-column`)
    remaining_cell.text(remaining)
    if (remaining < 0) {
      remaining_cell.css('color', 'red')
    } else {
      remaining_cell.css('color', 'green')
    }
  }, 200)
}

function calculateCaloriesConsumed() {
  setTimeout(function() {
    let addedUpTotal = 0
    $('.total-calories-column').each(function(x, y) {
      let number = parseInt(y.innerHTML)
      addedUpTotal += number
    })
    $('.calories-consumed').text(addedUpTotal)
  }, 300)
}

function calculateRemainingCalories() {
  setTimeout(function() {
    let grandTotal        = parseInt($('.grandTotal').text())
    let caloriesConsumed  = parseInt($('.calories-consumed').text())
    let remainingCalories = grandTotal - caloriesConsumed
    $('.total-remaining-calories').text(remainingCalories)
  }, 400)
}


function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("meals-foods-table")
  switching = true
  dir = "asc"
  while (switching) {
     switching = false;
     rows = table.getElementsByTagName("tr");
     for (i = 1; i < (rows.length - 1); i++) {
       shouldSwitch = false;
       x = rows[i].getElementsByTagName("td")[n];
       y = rows[i + 1].getElementsByTagName("td")[n];
       if (dir == "asc") {
         if (x.innerHTML > y.innerHTML) {
           shouldSwitch= true;
           break;
         }
       } else if (dir == "desc") {
         if (x.innerHTML < y.innerHTML) {
           shouldSwitch= true;
           break;
         }
       }
     }
     if (shouldSwitch) {
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
       switchcount ++;
     } else {
       if (switchcount == 0 && dir == "asc") {
         dir = "desc";
         switching = true;
       }
     }
   }
 }








//
