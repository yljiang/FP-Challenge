/*
 * Serve JSON to our AngularJS client
 */
var express     = require('express');
var https       = require('https');
var q           = require('q');
var api         = express.Router();
var db          = require('../config/db').connection;
var parseString = require('xml2js').parseString;

api.get('/api/apparel', function(req, res) {
	// Insert Apparel API code here
	db.query('SELECT * FROM apparel', function(err, rows, fields){
		if (err) throw err;

		res.json(rows);

	});
});

// API endpoint for /api/apparel
api.get('/api/apparel/:styleCode?', function(req, res) {
	// Insert Apparel API code here
	db.query('SELECT * FROM apparel WHERE style_code="' +req.params.styleCode+'"', function(err, rows, fields){
		if (err) throw err;

		res.json(rows);

	});
});

// API endpoint for /api/quote
api.post('/api/quote', function(req, res) {
	// Insert Quoting API code here

	var style_code = req.body.style_code;
	var color_code = req.body.color_code;
	var size_code = req.body.size_code;
	var quantity = req.body.quantity;
	var weight = req.body.weight;


	//Get proper color_code and size_code
	var idx = color_code.indexOf(':');
	color_code = color_code.substr(0,idx).trim();
	idx = size_code.indexOf(':');
	size_code = size_code.substr(0,idx).trim();

	getApparelPrice(style_code, color_code, size_code)
		.then(function(body){
			console.log(body);
			var price = body.substr(1);
			var costbreakdown = calculate(price, quantity, weight);

			console.log(costbreakdown);

			res.render('quote', {data: costbreakdown, style: style_code, quantity: quantity});
		}, function(){
			console.log('error');
		});

		function calculate(price, quantity, weight){
			var shipping;
			var commision = 1.07;
			var markup;
			var total;

			var ordercost = price * quantity;

			console.log('ordercost: ' + ordercost);

			//shipping cost	
			if (weight <= 0.4){
				if(quantity < 48) shipping = quantity * 1;
				else if(quantity >= 48) shipping = quantity * 0.75;
			}
			else if (weight > 0.4){
				if(quantity < 48) shipping = quantity * 0.5;
				else if(quantity >= 48) shipping = quantity * 0.25;
			}
	
			console.log('order + shipping: ' + parseInt(ordercost + shipping));

			total =  (ordercost + shipping) * commision;
			console.log('added 7% comission: ' + total);

			//markup
			if(total <= 800) {
				markup = 1.5;
			}else {
				markup = 1.45;
			}

			total *= markup;
			total = total.toFixed(2);

			console.log('After markup total: ' + total);

			return {
				ordercost: ordercost,
				shipping: shipping,
				markup: markup,
				total: total,
			};
		}
	
});

// Function for making an Inventory API call
var getApparelPrice = function getPrice(style_code, color_code, size_code) {
	var	apparelPriceDeferred = q.defer();

	// Format the Inventory API endpoint as explained in the documentation

	var url = 'https://www.alphashirt.com/cgi-bin/online/xml/inv-request.w?';
	var params='sr=' + style_code + '&cc=' + color_code + '&sc=' + size_code + '&pr=y&zp=10002&userName=triggered1111&password=triggered2222';

	https.get(url+params, function(res) {
		var body = '';
		var price;

		res.setEncoding('utf8');
		res.on('data', function (data) {
			// Parse response XML data here	
			body+= data;

			parseString(body, function(err, result){
				price = result['inv-balance'].item[0].$.price;
			});

			apparelPriceDeferred.resolve(price);
		});
	}).on('error', function(error) {
		// Handle EDI call errors here
		console.log(error);
	});

	return apparelPriceDeferred.promise;
};

module.exports = api;