const host = "http://localhost:3000/api/v1"

$(document).ready(() => {
  getFoods()
})


function getFoods() {
  return $.ajax({
    url: `${host}/foods`,
    method: 'GET'
  })
  .done(displayFoods)
  .fail((error) => console.log(error))
}

function displayFoods(foods) {
  $('#foods-table')
  for(let i = 0; i < foods.length; i++) {
    const id        = foods[i].id
    const name      = foods[i].name
    const calories  = foods[i].calories
    appendRow(id, name, calories)
  }
}

function appendRow(id, name, calories) {
  const button = '<button class="delete-button" type="button" name="Delete"></button>'
  const row    = `<tr><td id="food-id-${id}">${name}</td><td id="calories-coloumn">${calories}</td><td>${button}<td></tr>`
  $('#foods-table').prepend(row)
}
