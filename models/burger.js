let orm = require("../config/orm");

let burger = {
    all: function(cb) {
      orm.all("burgers", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    create: function(name, cb) {
      orm.create("burgers", [
        "burger_name", "devoured"
      ], [
        name, false
        // NICK:
        // adding a callback here, as the code was erroring out as there wasn't one;
        // basically we're passing this function here in as a callback function so that
        // when the orm.create() is called, it triggers this function when it's finished
        // which THEN calls `cb(res)`, <= this triggers the callback passed into 
        // burger.create() when we call it inside of 'burgers_controller.js'
        
        // (yes, this entire activity is confusing as heck, but it's valuable to learn
        // how to track callbacks from one file to another)

      ], function(res) {
          cb(res)
      });
    },
    update: function(objColVals, condition, cb) {
      orm.update("burgers", objColVals, condition, function(res) {
        cb(res);
      });
    },
    delete: function(condition, cb) {
      orm.delete("burgers", condition, res => {
        cb(res);
    });
  }
};
  
// Export the database functions for the controller (burgersController.js).
module.exports = burger;
  