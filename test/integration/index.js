var $ = require('jquery');
var assert    = require('chai').assert;
var expect    = require('chai').expect;
var webdriver = require('selenium-webdriver');
var until     = webdriver.until;
var test      = require('selenium-webdriver/testing');
var host      = "http://localhost:8080"
var By        = webdriver.By

test.describe('index.html', function() {
  var driver
  this.timeout(100000)

  test.beforeEach(function() {
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it("Shows meal table", function() {
    // var foods = $.ajax({url: host});

    driver.get(`${host}/index.html`)
    driver.sleep(200).then( function() {
      driver.findElement(By.id("meals-table")).getText().then(function(meals) {
        assert(foods.includes("Name"))
        assert(foods.includes("Calories"))
        expect(foods).to.include("Burrito 30")
        assert(foods.includes("Burrito 30"))
        assert(foods.includes("Sandwich 25"))
        assert(foods.includes("Cherry Pie 35"))
        assert(foods.includes("Banana 15"))
        assert.equal(foods.includes("Lasagna"), false)
      })
    })
  })


  test.it("can add a new food", function() {
    driver.get(`${host}/foods.html`)

    driver.findElement({css: '#food-name input'}).sendKeys("Lasagna")
    driver.findElement({css: '#food-calories input'}).sendKeys(101)
    driver.findElement({css: "input['type']=submit"}).click()

    driver.wait(until.elementLocated({css: "#foods-table"}))

    driver.findElement({css: "#foods-table"}).getText().then(function(name){
      expect(name).to.include( "Lasagna")
    })

    driver.findElement({css: "#foods-table"}).getText().then(function(calories){
      assert(calories.includes(101))
    })
  })


  test.it("can delete an existing food", function() {
    driver.get(`${host}/foods.html`)
    driver.wait(until.elementLocated({css: "#foods-table"}))

    driver.findElement({css: "#foods-table > tbody > tr:nth-child(1) > td:nth-child(3) > button"})
    .click()
    driver.wait(until.elementLocated({css: "#foods-table"}))

    driver.findElement({css: "#foods-table"}).getText().then(function(name){
      expect(name).to.not.include("Burrito")
    })
  })

  test.it("can filter foods", function() {
    driver.get(`${host}/foods.html`)
    driver.wait(until.elementLocated({css: "#foods-table"}))

    driver.findElement(By.id("search-input")).sendKeys("cherry")
    driver.findElement(By.id("foods-table")).getText().then(function(foods){
      expect(foods).to.include("Cherry Pie")
      expect(foods).to.not.include("Burrito")
      expect(foods).to.not.include("Sandwich")
      expect(foods).to.not.include("Banana")
    })
  })
})
