var User = require('../datasets/users');

module.exports.signupUser = function (req, res){
    var user = new User(req.body);
    
    user.save(function(err){
      if(err){
        res.json({status: 500});
      }else{
        User.find(req.body, function (err, results){
        if (err){
          
            console.log("Error Out");
        }
     
        if (results && results.length === 1){
            var userData= results[0];
            
            res.json({kredit_per_minute: userData.kredit_per_minute,
                      _id: userData._id,
                      userName: userData.userName,
                      typ: userData.typ,
                      kredit: userData.kredit,
                      activated_email: userData.activated_email

                      });
        }
    })

      }
    });    
    
}


module.exports.login = function (req, res){
    User.find(req.body, function (err, results){
        if (err){
        	 res.send('');          
        }
     
        if (results && results.length === 1){
            var userData= results[0];
            
            res.json({kredit_per_minute: userData.kredit_per_minute,
                      _id: userData._id,
                      userName: userData.userName,
                      typ: userData.typ,
                      kredit: userData.kredit,
                      activated_email: userData.activated_email

                      });
        }else{
          res.send(''); 
        }
    })

}

module.exports.check_user = function (req, res){
  
  var find = {userName: req.body.userName};
    User.find(find, function (err, results){
        if (err){
           res.send('');          
        }
     
        if (results && results.length === 1){
                        
            res.send('');
        }else{
          res.send('exist'); 
        }
    })

}
module.exports.check_user_mail = function (req, res){
  
  var find = {email: req.body.email};
    User.find(find, function (err, results){
        if (err){
           res.send('');          
        }
     
        if (results && results.length === 1){
                        
            res.send('');
        }else{
          res.send('exist'); 
        }
    })

}

module.exports.cancel = function (req, res){
  
  
    User.find(req.body, function (err, results){
        if (err){
           res.send('err');          
        }
     
        if (results && results.length === 1){
            
            User.remove(results,function (err,results){

              res.send('');
            })
                        
            
        }else{
          res.send('wrongpassword'); 
        }
    })

}
    
module.exports.change = function (req, res){

  var find= {
    userName: req.body.userName,
    password: req.body.password
    
  };
  
  User.find(find, function (err, results){
      if (err){
         res.send('err');          
      }
   
      if (results && results.length === 1){
          var userData= results[0];
          userData.password=req.body.password_new;
          userData.save(function (err){
            if(err){
              res.send('err');
            }else{
              res.send('');
            }
          });
                      
          
      }else{
        res.send('wrongpassword'); 
      }
  })

}
   
 

