var mongoose = require("mongoose");
var User = require('./user');

var stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    require: true,
    maxLength: 20
  },
  price: {
    type: Number
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

stockSchema.pre('remove', function(next) {
  User.findById(this.userId).then(function(user) {
    user.stocks.remove(this.id);
    user.save().then(function(e) {
      next();
    });
  }).catch(function(err) {
    next(err);
  });
});

var Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;