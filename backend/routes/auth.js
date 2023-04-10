const express = require('express');
const router = express.Router();
const User = require('../models/User');     //user ko import kar dia user module se
const { body, validationResult } = require('express-validator');     //ye express validator hai ye inputr pe limit set karne ke kaam ata hai
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');      //jwt package import kar dia
var fetchuser = require('../middleware/fetchuser');   //middleware module ko import kr dia

const JWT_SECRET = 'shubh&12huo';    // secret token type


// ROUTE-1 create user using post "/api/auth/createuser" No login required          //yahan user ko ham create kar rhe hai

router.post('/createuser',[
    body('name', 'enter valid name').isLength({ min: 3 }),            //ye validtor ne minimum 3 character ki limit laga di kisi bhi name input pe
    body('email', 'Enter valid email').isEmail(),                       //similarly email valid honi chahiye
    body('password', 'Password must be 5 digit').isLength({ min: 3 }),
], async (req, res)=>{
  //if there are errors, retuen bad request and errors
    const errors = validationResult(req);               //errors naam ka const bana isme jo bhi req ayi wo store hui
    if (!errors.isEmpty()) {                            
      return res.status(400).json({ errors: errors.array() });
    }  
    // check whether user with this email exist already
    try{
    let user = await User.findOne({email: req.body.email}); //user variable me us email ko store kar dia jo match kar rhi hai entered email se
    if (user) {                                             // agar user already exist email enter krta hai then
      return res.status(400).json({error:"Sorry a user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);                     //yahan salt generate kar dia 
    const secPass = await bcrypt.hash(req.body.password, salt);     // password aur salt de dia aur us se ek hash generate kia jo secpass me store kar dia
    //creating new user
    user = await User.create({                                   //user create hua yahan pe
        name: req.body.name,                        
        password: secPass,  
        email: req.body.email,   
      });
      
      const data = {       //DATA NAAM KA CONST BANAYA 
        user:{
          id: user.id             //constant me user object banakar usme id store kara di
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);      //authtoken variable me data(DATA IS JUST USER'S ID) k sath secret key bhi dedi
      res.json({authtoken})                              //isi authtoken variable ko as a response de diya
      
    }catch (error) {      //koi error aya to pata chal jayega
      console.error(error.message);   
      res.status(500).send("Internal Server Error");   //error aane par status code 500 a jayega
    }
} )



// ROUTE-2 Authenticate a User during login using: POST "/api/auth/login". No login required          //yahan ham user ko login kara rhe hai 

router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(),          //email valid honi chahiye
  body('password', 'Password cannot be blank').exists(),    //password ka block exist krna chahiye bole to khali nhi hona chaiye
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);                                 //agar req marte waqt koi error ho to error me save krna hai
  if (!errors.isEmpty()) {                                              //agar error khali nhi hai to return kr dega status code and message 
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;                      //user ne credential dale, humne re.body me se email aur password alag kr diye
  try {
    let user = await User.findOne({email});                     //jo email user enter kar rha hai wahi doodh k user variable me daali jayegi
    if(!user){                                                  // agar user exist nhi krts to erroe message is shown
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);        //ye bcrypt function hai jo entered password aur database ka password compare krke true false return kr dega
    if(!passwordCompare){                                                          //agar false return hua to error show karna hai
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);     //agar use se sahi login credentials daale to id ko sign krke bhej diya
    res.json({authtoken})                             //response me authtoken bhej diya

  } catch (error) {                                     //agar upar ki process me hamaraa koi error aya to
    console.error(error.message);                  
    res.status(500).send("Internal Server Error");          //user ko ye error de denge
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required      yahan jwt token bhejna padega

router.post('/getuser', fetchuser,  async (req, res) => {       
       //fetch user, user ko fetch kar lega jahan login karwana ho wahan ham ise use kar sakte hain
  try {
    userId = req.user.id;      // fetchuser se user id mil gayi
    const user = await User.findById(userId).select("-password")   //sab kuch select kar lenge except password(name, email), yahan hamne id se user ki detail fetch krli aur user constant me save krdi
    res.send(user)                                      // response me hamne user ki detail hejdi
  } catch (error) {                      //koi bhi internal error aye to console pe bhejo aur user ko internal server error ka message bhejdo
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router