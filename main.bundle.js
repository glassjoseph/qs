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

	$(document).ready(() => {

	  getFoods();
	  filterTable();
	});

	function getFoods() {
	  return $.ajax({
	    url: `${host}/foods`,
	    method: 'GET'
	  }).done(displayFoods).fail(error => console.log(error));
	}

	function displayFoods(foods) {
	  $('#foods-table');
	  for (let i = 0; i < foods.length; i++) {
	    const id = foods[i].id;
	    const name = foods[i].name;
	    const calories = foods[i].calories;
	    appendRow(id, name, calories);
	  }
	}

	function appendRow(id, name, calories) {
	  const button = '<input type="checkbox"/>';
	  const row = `<tr><td id="food-id-${id}">${name}</td><td id="calories-coloumn">${calories}</td><td>${button}<td></tr>`;
	  $('#foods-table').prepend(row);
	}

	function filterTable(table_id) {
	  // might want to add args for filtering different tables?
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