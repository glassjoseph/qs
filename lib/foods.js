const host = "http://localhost:3000/api/v1"

function getFoods() {
  return $.ajax({
    url: `${host}/foods`,
    method: 'GET'
  })
  .done()
  .fail()
}
