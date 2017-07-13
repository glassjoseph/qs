const host    = "http://localhost:3000/api/v1"
//const Shared  = require('./shared')

$(document).ready(() => {
  getFoods()
  getMeal("Breakfast")
  getMeal("Lunch")
  getMeal("Dinner")
  getMeal("Snacks")
  filterTable('meals-foods-table', 0)
  deleteMealLog()
  })
  calculateMealTotal('Breakfast')
  calculateMealTotal('Lunch')
  calculateMealTotal('Dinner')
  calculateMealTotal('Snacks')
  calculateMealRemaining()
})

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
  const row    = `<tr class='table-row'><td id="${id}-food-id">${name}</td><td id="calories-column">${calories}</td><td>${button}<td></tr>`
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
      // removeFoodFromDatabase(name)
      removeMealLogFromDatabase(meal_id, food_id)
    }
  })
}

function removeMealLogFromDatabase(meal_id, food_id) {
  return $.ajax({
    url: `${host}/meal_logs/?meal_id=${meal_id}&food_id=${food_id}`,
    method: 'DELETE',
    // data:  name
  })
  .done()
  .fail((error) => {
    console.log("Couldn't remove this food from meal")
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
    derp.each(function(x, y) {
      let number = y.innerHTML
      total += parseInt(number)
    })
    $(`#${mealID} .total-calories-column`).text(total)
  }, 300);
}

function calculateMealRemaining() {

}
