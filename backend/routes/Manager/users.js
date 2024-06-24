var express = require('express');
var router = express.Router();



router.post('/', function(req, res, next) {
  // Assuming user_id is sent in the form data
  var userId = req.body.user_id;

  // Perform actions with userId, like fetching user data from a database

  // Respond with the user data or a relevant message
  res.json({ message: 'User data received', user_id: userId });
  console.log("user_id: " + userId);
});

module.exports = router;
