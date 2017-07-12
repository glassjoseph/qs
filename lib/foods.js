const host    = "http://localhost:3000/api/v1"
//const Shared  = require('./shared')

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
  let row    = `<tr><td id="name-column" class="editable" contentEditable="true">${name}</td><td class="editable" contentEditable="true" id="calories-coloumn">${calories}</td><td>${button}<td></tr>`

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
    let object    = this.activeElement.closest('tr')
    let name      = object.querySelector('#name-column').innerHTML
    if (event.target.className === "delete-button") {
      object.remove()
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
  var oldText = $('#foods-table').html()
  $('#foods-table').on("blur", "tr", function(event) {
    if (oldText!=$(this).html()){
      // debugger
      // let name = event.target.innerText
      // let id = event.target.food_id
      // updateFood(name, id)
      oldText = $(this).html();
    }
  })
}

function updateFood(id, name, calories) {

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
