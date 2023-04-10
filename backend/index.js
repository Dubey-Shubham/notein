const connectToMongo = require('./db');  //yahan connecttomongo module ko import kara dia  
const express = require('express')
connectToMongo(); //function run kar dia is module ka

const app = express()
const port = 5000

app.use(express.json())    //req.body ko  use krne k liye hame app.use middleware use krna jaroori honda

//available routes
app.use('/api/auth', require('./routes/auth'))        //auth.js milega jab ham route karenge api/auth ko
app.use('/api/notes', require('./routes/notes'))      //notes.js milega jab ham route karenge api/notes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})