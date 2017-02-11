var User = require('../datasets/users');

module.exports.goonline = function(req,res){  

    User.findById(req.body.userId,'stav_streamu', function (err, results){
        

        var user = results;
        user.stav_streamu='online';
        user.save(function(err){
          if(err){
           
            res.json({status:500});
          }else{
            
            res.json({status: 200});
          }
        });
        

           

     });
};

module.exports.go_offline = function(req,res){  

    User.findById(req.body.userId,'stav_streamu', function (err, results){
      
        var user = results;
        if(user.stav_streamu !== 'offline'){

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            var today = dd+'.'+mm+'.'+yyyy;

          user.last_online = today;
          user.stav_streamu='offline';           
          user.save(function(err){
            if(err){
              
              res.json({status:500});
            }else{
              
              res.json({status: 200});
            }
          });
        
        }else{
           var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            var today = dd+'.'+mm+'.'+yyyy;
            console.log(today);

          user.last_online = today;
          user.save(function(err){
            if(err){
              
              res.json({status:500});
            }else{
              
              res.json({status: 200});
            }
          });
        }
           

     });
};
