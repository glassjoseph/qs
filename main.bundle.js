/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	const host = "http://localhost:3000/api/v1";
	//
	$(document).ready(() => {

	  getFoods();
	  getMeal("Breakfast");
	  filterTable('meals-foods-table');
	});

	function getFoods() {
	  return $.ajax({
	    url: `${host}/foods`,
	    method: 'GET'
	  }).done(displayMeal).fail(error => console.log(error));
	}

	function getMeal(name) {
	  return $.ajax({
	    url: `${host}/meals/${name}`,
	    method: 'GET'
	  }).done(displayFoods).fail(error => console.log(error));
	}

	function displayFoods(foods) {
	  $('#meals-foods-table');
	  for (let i = 0; i < foods.length; i++) {
	    // debugger
	    const id = foods[i].id;
	    const name = foods[i].name;
	    const calories = foods[i].calories;
	    appendRow(id, name, calories, true);
	  }
	}

	function displayMeal(foods) {
	  $('#meals-foods-table');
	  for (let i = 0; i < foods.length; i++) {
	    // debugger
	    const id = foods[i].id;
	    const name = foods[i].name;
	    const calories = foods[i].calories;
	    appendRow(id, name, calories, true);
	  }
	}
	//
	//
	// function displayFoods(foods) {
	//   for(let i = 0; i < foods.length; i++) {
	//     let id        = foods[i].id
	//     let name      = foods[i].name
	//     let calories  = foods[i].calories
	//     let status    = foods[i].food_status
	//     if (status == "active"){
	//       prependRow(id, name, calories)
	//     }
	//   }
	// }


	function appendRow(id, name, calories, checkbox = false) {
	  let button = checkbox ? '<input type="checkbox"/>' : "";
	  const row = `<tr><td id="food-id-${id}">${name}</td><td id="calories-column">${calories}</td><td>${button}<td></tr>`;
	  $('#meals-foods-table').prepend(row);
	}

	function filterTable(table_id) {
	  var input = document.getElementById("search-input");
	  var filter = input.value.toLowerCase();
	  var table = document.getElementById(table_id);
	  var tr = table.getElementsByTagName("tr");
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}

/***/ })
/******/ ]);