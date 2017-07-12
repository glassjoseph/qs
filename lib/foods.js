const host = "http://localhost:3000/api/v1"

$(document).ready(() => {
  $('#add-to-foods').submit(() => {
    addFood()
  })
  getFoods()
  deleteFood()
  editFood()
  filterTable('foods-table')
})


function getFoods() {
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
  let row    = `<tr></td><td id="name-column" class="editable" contentEditable="true">${name}</td><td class="editable" contentEditable="true" id="calories-coloumn">${calories}</td><td>${button}<td></tr>`

  //data-id='${id}'
  return $('#foods-table').prepend(row)
}

function addFood() {
  let name      = $('#name-input').val()
  let calories  = parseInt($('#calories-input').val())
  //let id        = getSingleFood(name)
  postNewFood(name, calories)
  prependRow(name, calories)
  return false
}

function postNewFood(name, calories) {
  return jQuery.post(
    `${host}/foods`,
    {name: name, calories: calories}
  )
  .done()
  .fail((error) => {
    console.log("Couldn't post this to the database. You probably fucked up")
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
    object.remove()
    removeFoodFromDatabase(name)
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
  $('#foods-table').on('input', function(event) {
   const new_attribute = event.target.innerHTML
  })
}

// function updateFood(name, calories) {
//
// }

function filterTable(table_id) {
  var input  = document.getElementById("search-input")
  var filter = input.value.toLowerCase()
  var table  = document.getElementById(table_id)
  var tr     = table.getElementsByTagName("tr")
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]
    if (td) {
      if (td.innerHTML.toLowerCase().indexOf(filter) > - 1) {
        tr[i].style.display = ""
      } else {
        tr[i].style.display = "none"
      }
    }
  }
}
