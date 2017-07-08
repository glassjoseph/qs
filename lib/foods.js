const host = "http://localhost:3000/api/v1"

$(document).ready(() => {
  $('#add-to-foods').submit(() => {
    addFood()
  })
  getFoods()
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
    appendRow(name, calories)
  }
}

function appendRow(name, calories) {
  let button = '<button class="delete-button" type="button" name="Delete"></button>'
  let row    = `<tr><td id="food-name">${name}</td><td id="calories-coloumn">${calories}</td><td>${button}<td></tr>`
  return $('#foods-table').prepend(row)
}

function addFood() {
  let name      = $('#name-input').val()
  let calories  = parseInt($('#calories-input').val())
  appendRow(name, calories)
  postNewFood(name, calories)
  return false
}


function postNewFood(name, calories) {
  return jQuery.post(
    `${host}/foods`,
    {name: name, calories: calories}
  )
  .done()
  .fail((error) => console.log(error))
}
