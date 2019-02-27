/*global fetch*/
var db = require('../models');

exports.createStock = function(req, res, next) {
  const newStock = {
    symbol: req.body.symbol,
    userId: req.params.id
  };
  
  db.Stock.create(newStock).then(function(stock) {
    db.User.findById(req.params.id).then(function(user) {
      user.stocks.push(stock.id);
      user.save().then(function(user) {
        return db.Stock.findById(stock._id)
          .populate('userId', {username: true});
      }).then(function(s) {
        return res.status(200).json(s);
      }).catch(next);
    }).catch(next);
  }).catch(next);
};

module.exports = exports;