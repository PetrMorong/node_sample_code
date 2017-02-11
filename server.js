var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');

var http = require('http').Server(app);
var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var stream_controller = require('./server/controllers/stream_controller');
var s_get_models_controller = require('./server/controllers/s_get_models_controller');
var update_profile_controller = require('./server/controllers/update_profile_controller');
/*var profileController = require('./server/controllers/profile-controller');
var wasteController = require('./server/controllers/waste-controller');
var usersController = require('./server/controllers/users-controller');*/

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/mystery');

app.use(bodyParser.json());
//app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/assets', express.static(__dirname + "/assets"));
//app.use('/uploads', express.static(__dirname + "/uploads"));




app.get('/', function(req, res){
    res.sendfile('index.html');
});



//Authentication

app.post('/api/user/signup', authenticationController.signupUser);
app.post('/api/user/login', authenticationController.login);

app.post('/api/user/check_user', authenticationController.check_user);
app.post('/api/user/check_user_mail', authenticationController.check_user_mail);
app.post('/api/user/cancel', authenticationController.cancel);
app.post('/api/user/change', authenticationController.change);

//on-off stream
app.post('/api/user/goonline', stream_controller.goonline);
app.post('/api/user/go_offline', stream_controller.go_offline);

//generate models on landing page
app.post('/api/models/get_models', s_get_models_controller.get_models);
//get model profile info
app.post('/api/models/m_profile', s_get_models_controller.m_profile);

//update profile 
app.post('/api/profile/update_profile',update_profile_controller.update_profile )

//Profile
//app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
//app.post('/api/profile/updateUsername', profileController.updateUsername);
//app.post('/api/profile/updateBio', profileController.updateBio);

//Waste
//app.post('/api/waste/post', wasteController.postWaste);
//app.post('/api/waste/get', wasteController.getWastes);

//User
//app.get('/api/users/get', usersController.getUsers);
//app.post('/api/users/follow', usersController.followUser);

var io = require('socket.io').listen(app.listen(27017 || process.env.PORT ));

io.sockets.on('connection', function (socket) {
    
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});




