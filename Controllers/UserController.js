const User= require('../models/User')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
const passport = require('passport');

exports.addUser=(req, res, next)=>{

    var user=new User(req.body);
    bcrypt.hash(req.body.password, 10, function(err, hash) {

       user.password=hash;
       user.save().then(item => {
        console.log("data saved");
      })
      .catch(err => {
        console.log(err)
      });
      });
 
        res.send(req.body)
  };

  exports.loginWithPassport=(req,res,next)=>{
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        return next(err);
      }
  
      if(passportUser) {
        console.log(passportUser);
        
        const user = passportUser;
                    const token = jwt.sign(
                {
                  email: passportUser.email,
                  userId: passportUser._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
              );
        user.token = token
  
    return res.status(200).json({
        firstName: passportUser.firstName,
        lastName: passportUser.lastName,
        email: passportUser.email,
        token : token
                     });
      }
  
      return res.status(400).json(info);
    })(req, res, next);
    
  }
  exports.login=(req, res, next)=>{
    
    
  User.findOne({email:req.body.email},function(err,doc){
      if(doc!=null){
       
     
        bcrypt.compare(req.body.password, doc.password, function(err, result) {
            if(result) {
              const token = jwt.sign(
                {
                  email: doc.email,
                  userId: doc._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
              );
              const { body: { user } } = req;
        
         
            
              return res.status(200).json({
                message: "Auth successful",
                token: token
              });
            } else {
               return res.status(401).json({
                    message:"verify password"
                })
            } 
          });
      }
      else{
        return res.status(401).json({
            message:"verify email"
        })
      }
  
  })
   
 
  };





