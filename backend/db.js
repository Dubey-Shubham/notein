const mongoose = require('mongoose');                //mongoose ko import kar dia
const mongoURI = "mongodb://127.0.0.1:27017/notein"          // mongouri naam ka ek constant

const connectToMongo = ()=>{                      //function jisme mongoose se connect kia
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;


//mongo compass se connect krne k liye kisi bhi terminal me mongod open kar lena