const Book= require('../models/Book')
const User= require('../models/User')
const jwt= require('jsonwebtoken')

exports.addBook=(req, res, next)=>{
  jwt.verify(req.token, process.env.JWT_KEY,function(err,data){
    if(err)
    res.status(401).json({
      message:"forbidden"
    })
    else{
      var book=new Book(req.body);
    User.findById(req.query.id, function (err, user) {
        book.author=user;
        book.save().then(item => {
            console.log("data saved");
          })
          .catch(err => {
            console.log(err)
          });
    });
   
    
        res.send(req.body)
    }
  })
   
  };


  exports.allBooks=(req, res, next)=>{
    jwt.verify(req.token, process.env.JWT_KEY,function(err,data){
      if(err)
      res.status(401).json({
        message:"forbidden"
      })
      else{
        Book.find().populate('author').exec().then(
          books=>{
              res.send(books);
          }
      )
      }
    })
    
  };


    
  exports.ensureToken=(req,res,next)=>{
    
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader!=="undefined"){
    const bearer=bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token=bearerToken;
    
    next();
  
    }
    else{
        res.sendStatus(403);
    }
  }