const mongoose = require('mongoose');      //mongoose inport kar diya
const { Schema } = mongoose;                 //schema banayi hai to import bhi karni padegi

const NotesSchema = new Schema({                //schema banadi
    user:{
        type: mongoose.Schema.Types.ObjectId,   //hamne ek user schema banaya jo notes ko user se associate karega so that koi aur user kisi aur k notes na access kar sake 
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NotesSchema);