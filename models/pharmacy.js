var db = require('../dbPharmacy');
var Pharmacy = db.Schema({
		OrgCode: { type: String, required: true },
		Name: { type: String, require: true },
		Address1: { type: String, require: true },
		Address2: { type: String, require: true },
		Address3: { type: String, require: true },
		PostCode: { type: String, require: true },
		Tel: { type: String, require: true },
		loc: { 
			coordinates: { type: Array }
		}
	});
module.exports = db.model('Pharmacy', Pharmacy);