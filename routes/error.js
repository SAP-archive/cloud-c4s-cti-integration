var express = require('express');
var router = express.Router();

/* GET rest. */
router.get('/', function(req, res, next) {
  res.json({message : "Not found"});
});

module.exports = router;
