const mongoose = require('mongoose');      //mongoose inport kar diya
const Schema = mongoose.Schema;

const UserSchema = new Schema({                //schema banadi
    name:{
        type: String,
        required: true                  // mtlb ye field bharna required hai
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now        //by default kya value hogi
    },
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;
  //is model ko export kar dia aur model ka naam user hai, schema ka naam UserSchema