const request = require('request');
const cheerio = require('cheerio');
const opn = require('opn');
const url = 'https://localbitcoins.com/sell-bitcoins-online/US/united-states/amazon-gift-card-code/';
var is_found = false;

function interval() {
  request(url, (error, response, body) => {
    var $ = cheerio.load(body);
    var max = 0;
    $('.column-price').each(function(i, element) {
      var price = parseFloat($(this).text().replace(' USD', '').replace(',', '').trim());
      if (max < price) {
        max = price;
      }
    });
    if (max > price_line) {
      if (!is_found) {
        opn(__dirname + '/you_suffer.mp3');
      }
      console.log('Found! There is a deal with the price of ' + max);
      is_found = true;
    } else {
      console.log('Still searching...');
      is_found = true;
    }
  });
}

var args = process.argv.slice(2);
if (typeof args[0] === 'undefinded') {
  console.log('please set a price line');
} else {
  var price_line = parseInt(args[0]);
  interval();
  setInterval(interval, 2 * 60000);
}