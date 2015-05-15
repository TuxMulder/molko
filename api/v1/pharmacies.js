var router = require('express').Router();
var Pharmacy = require('../../models/pharmacy');


router.post('/', function (req, res, next){
	Pharmacy.find({ loc: { $near: { $geometry: {type: 'Point', coordinates: [ req.body.lat, req.body.long ] }, $maxDistance: 5000 } } })
		.select('Name')
		.select('Address1')
		.select('Address2')
		.select('Address3')
		.select('Address4')
		.select('PostCode')
		.select('Tel')
		.select('loc')
		.limit(5)
		.exec(function (err, pharmacies) {
			if(err){
				console.log(err);
				return next(err);
			}
			if(!pharmacies){
				return res.status(403);
			}
			return res.status(200).json(pharmacies)
		});
});

/*router.post('/', function (req, res, next) {
	
});*/
module.exports = router;