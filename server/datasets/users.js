var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	typ: String,
	userName: String,
	email: String,
	activated_email: {type: Number, default: 0},
	completed_profile: {type: Number, default: 0},
	password: String,
	kredit: {type: Number, default: 0}, 
	watching: Number,
	kredit_per_minute: {type: Number, default: 0.7},
	followers: [{userId: String}],
	following: [{userId: String}],
	stav_streamu: {type: String, default: 'offline'},
	age: {type: Number, default: 18},
	vyska: Number,
	vaha: Number,
	prsa: Number,	
	sex_orientace: String,	
	neco_o_mne: String,
	co_mam_rada: String,
	casovy_plan: String,
	profile_pic: String,
	photos: [{path: String}],
	last_online: { type: Date, default: Date.now }
});

var User= mongoose.model('User',UserSchema);
module.exports = User;