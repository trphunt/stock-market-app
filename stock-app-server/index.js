require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var authRoutes = require('./routes/auth');
var stocksRoutes = require('./routes/stocks');
var auth = require('./middleware/auth');
var db = require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.json({message: "Make a POST request to /api/auth/signup to signup"});
});

app.use('/api/users/:id/stocks',
        auth.loginRequired, auth.ensureCorrectUser,
        stocksRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/stocks', function(req, res, next) {
  db.Stock.find().sort({createAt: 'desc'})
    .populate("userId", {username: true})
    .then(function(stocks) {
      res.json(stocks);
    }).catch(function(err) {
      res.status(500).json(err);
    });
});

const PORT = 8081;

app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});