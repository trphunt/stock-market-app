var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('../models');
var helpers = require('../helpers/stocks');

router.post('/', helpers.createStock);

module.exports = router;