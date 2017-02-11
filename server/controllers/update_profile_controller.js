var User = require('../datasets/users');

module.exports.update_profile = function(req,res){
	var id=req.body.id;

	User.findById(id, function (err,results){
		if(err){
			console.log(err);
		}else{
			var user = results;
			user.age=req.body.age,
			user.vyska=req.body.vyska,
			user.vaha=req.body.vaha,
			user.prsa = req.body.prsa,
			user.sex_orientace=req.body.sex_orientace,
			user.piercing=req.body.piercing,
			user.co_mam_rada=req.body.co_mam_rada,
			user.casovy_plan=req.body.casovy_plan

			user.save(function(err){
				if(err){
					console.log('error server side');
					res.json({status: 500});
				}else{
					console.log('successfully updated profile ;) ');
					res.json({status: 200});

				}
			})

		}
	})


}