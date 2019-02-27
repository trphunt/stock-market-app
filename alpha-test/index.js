var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const alpha = require('alphavantage')({key: 'ILFTJ1P130K0UMMN'});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

alpha.data.intraday('GOOGL').then(data => {
    console.log(data["Time Series (1min)"][data["Meta Data"]["3. Last Refreshed"]]["4. close"]);
});

//console.log(last);
//console.log(output);

/*const price = alpha.data.intraday('GOOGL').then(data => {
  return data["Time Series (1min)"][last];
});*/

//console.log(price);

app.listen(process.env.PORT, function() {
    console.log(`Server running`);
});