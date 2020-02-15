let express = require("express");
let router = express.Router();

let burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("index", hbsObject);
    });
});

// NICK:
// I'd recommend renaming this route to '/api/burgers' for consistency's sake;
// this is the route the front-end is hitting, plus then the path is more 
// consistent with the PUT route url below
router.post("/api/burgers", function(req, res) {
    console.log(req.body)

    burger.create(req.body.burger_name, function(result) {
      console.log(result);
      // Send back the ID of the new quote
      // res.json({ id: result.insertId });

      res.redirect("/");
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

// NICK:
// added this route for the delete functionality; FYI that the delete functionality
// is technically not required for this assignment, but I'm glad you are being ambitious!
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


module.exports = router;