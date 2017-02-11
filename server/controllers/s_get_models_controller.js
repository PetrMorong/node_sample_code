var User = require('../datasets/users');

module.exports.get_models = function(req,res){
	
	User.find().where('typ').equals('modelka').exec(function (err,results){
		if(err){
			console.log("error");
		}
		else{
			res.json(results);
		}

	})
}

module.exports.m_profile = function(req,res){
	
	User.find(req.body, function (err,results){
		if(err){
			res.send('err');
		}else{
			res.json(results);
		}
	})
}


