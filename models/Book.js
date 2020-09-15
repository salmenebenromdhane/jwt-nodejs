var mongoose = require('mongoose');
var Schema = mongoose.Schema

var bookSchema = new Schema(
 {
  id:{type:Number},
  title:    { type: String},  
  author:{
      type:Schema.Types.ObjectId,ref:'User'
  }
});

module.exports =  mongoose.model('Book', bookSchema);