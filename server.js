//TODO: refactor split out responsibilities - auth, routes and chat
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.use('/api/v1/pharmacies', require('./api/v1/pharmacies'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/PharmacyFind.html');
});


/*app.post('/pharm/check/organisation', function (req, res) {
	Pharmacy.findOne({OrgCode: req.body.orgCode})
			.select('Name')
			.select('Address1')
			.select('Address2')
			.select('Address3')
			.select('PostCode')
			.exec(function (err, pharmacy){
				if(err) { 
					return next(err);
				}
				if(!pharmacy) {
					return res.status(403).json({invalidOrg: true});
				}
				pharmacy.invalidOrg = false;
				return res.status(200).json(pharmacy);
			});
});
*/

http.listen(4000, function(){
	console.log('listening on *:4000');
});

