var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema(
 {
  id:{type:Number},  
  firstName: { type: String },
  lastName:    { type: String},
  email : {type:String},
  password:{type:String}
  

});

module.exports =  mongoose.model('User', userSchema);