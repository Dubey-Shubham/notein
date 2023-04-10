var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shubh&12huo';

const fetchuser = (req, res, next) => {     //ye ek middleare func hai aur ye function request,response aur next lega as a input, next ka mtlb agla middleware call kar jayega
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');      // header req kar rhe hai aur use token me store kar denge, header se hi id niklega
    if (!token) {                               //agar token nhi hai to show error
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);    //token ko verify kar rhe hai secret key se aur verify krke data me store kar diya
        req.user = data.user;                           //jab user request karega to data use mil jayega
        next();                                         // data milne k baad next middleware apna kaam karega
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })  //agar token galat hai ya wrong hai to try catch se error throw kar diya
    }

}


module.exports = fetchuser;

//middleware nodejs ka function hai jise call kiya jata jab bhi login required wale routes pe call ayegi
//ise ham function me pass krke use kar sakte hain
//yahan ham authentication header se id nikaal rhe hain
// ye code id extrect krne ka auth me bhi likh sajkte the par middleware banane se ye same file multiple jagah use ki ja sake gi