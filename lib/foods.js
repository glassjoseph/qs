//const host    = "http://localhost:3000/api/v1"
const host  = "https://quantself-1701.herokuapp.com/api/v1"

$(document).ready(() => {
  $('#add-to-foods').submit((event) => {
    event.preventDefault()
    addFood()
  })
  getFoods()
  deleteFood()
  editFood()
  filterTable('foods-table', 0)
})

function getFoods() {
  // Shared.foodsApiRequest()
  // .done(displayFoods)
  // .fail((error) => console.log(error))
  return jQuery.get(`${host}/foods`)
  .done(displayFoods)
  .fail((error) => console.log(error))
}

function displayFoods(foods) {
  for(let i = 0; i < foods.length; i++) {
    let name      = foods[i].name
    let calories  = foods[i].calories
    let status    = foods[i].food_status
    //let id        = foods[i].id
    if (status == "active"){
      prependRow(name, calories)
    }
  }
}

function prependRow(name, calories) {
  let button = '<button class="delete-button" type="button" name="Delete"></button>'
  let row    = `<tr id='${name}'><td class="editable name-column" contentEditable="true">${name}</td><td class="editable calories-column" contentEditable="true">${calories}</td><td>${button}<td></tr>`

  //data-id='${id}'
  return $('#foods-table').prepend(row)
}

function addFood() {
  let name      = $('#name-input').val()
  let calories  = parseInt($('#calories-input').val())
  //let id        = getSingleFood(name)
  postNewFood(name, calories)
  prependRow(name, calories)
  $('#name-input').val('')
  $('#calories-input').val('')
  return false
}

function postNewFood(name, calories) {
  return jQuery.post(
    `${host}/foods`,
    {name: name, calories: calories}
  )
  .done()
  .fail((error) => {
    console.log("Couldn't post this to the database. You probably messed up")
    console.log(error)
  })
}

function getSingleFood(name) {
  return jQuery.get(`${host}/foods/${name}`)
  .done()
  .fail((error) => {
    console.log("Couldn't get the food you asked for")
    console.log(error)
  })
}

function deleteFood() {
  $(document).click('button', function(event) {
    if (event.target.className === "delete-button") {
      let tr    = event.target.parentElement.parentElement
      let name  = tr.id
      tr.remove()
      removeFoodFromDatabase(name)
    }
  })
}

function removeFoodFromDatabase(name) {
  return $.ajax({
    url: `${host}/foods/${name}`,
    method: 'DELETE',
    data:  name
  })
  .done()
  .fail((error) => {
    console.log("Couldn't delete this food")
    console.log(error)
  })
}

function editFood() {
  let oldContent = $('#foods-table').html()
  $('#foods-table').on("blur", "tr", function(event) {
    if (oldContent!=$(this).html()){
      let newValue = event.target.innerText
      let name = event.target.parentElement.id
      if (event.target.className === "editable name-column") {
        updateName(name, newValue)
        event.target.parentElement.id = newValue
      } else if (event.target.className === "editable calories-column") {
        updateCalories(name, newValue)
      }
      oldContent = $(this).html();
    }
  })
}

function updateName(name, newName) {
  $.ajax({
    type: "PUT",
    url: `${host}/foods/${name}?new_name=${newName}`,
  });
}

function updateCalories(name, calories) {
  $.ajax({
    type: "PUT",
    url: `${host}/foods/${name}?calories=${calories}`,
  });
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
