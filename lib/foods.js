const host = "http://localhost:3000/api/v1"

$(document).ready(() => {
  $('#add-to-foods').submit(() => {
    addFood()
  })
  getFoods()
  deleteFoodFromClient()
  editFood()
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
    prependRow(id, name, calories)
  }
}

function prependRow(id, name, calories) {
  let button = '<button class="delete-button" type="button" name="Delete"></button>'
  let row    = `<tr><td id="food-id">${id}</td><td id="name-column">${name}</td><td id="calories-coloumn">${calories}</td><td>${button}<td></tr>`
  return $('#foods-table').prepend(row)
}

function addFood() {
  let name      = $('#name-input').val()
  let calories  = parseInt($('#calories-input').val())
  postNewFood(name, calories)
  let id        = getSingleFood(name)
  prependRow(id, name, calories)
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

//doesn't persist
function deleteFoodFromClient() {
  $(document).click('button', function(event) {
    let object    = this.activeElement.closest('tr')
    let name      = object.querySelector('#name-column').innerHTML
    object.remove()
    //return false
    removeFoodFromDatabase(name)
  })

}

function removeFoodFromDatabase(name) {
  //debugger
  // return jQuery.delete(`${host}/foods/${name}`)
  // .done()
  //there should be a fail here

  //ajax way
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
  setTimeout(edit, 50000)
  const selections = $("#name-column", "calories-coloumn")
  selectors.on({
    "keypress": (event) => {
      event.preventDefault()
      $(this).prop("contenteditable", false)
      let object    = this.activeElement.closest('tr')
      let name      = object.querySelector('#name-column')
      let calories  = object.querySelector('#calorie-column')
      updateFood(name, calories)
    },
    "dblclick": () => {
      selections.not(this).prop("contenteditable", false)
      $(this).prop("contenteditable", true)
    }
  })
}
