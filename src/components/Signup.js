import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""})
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {                // e stands for event
    e.preventDefault();
    const {name, email, password} = credentials;     //destructing ki help se credentials se inko nikal liya                            // will avoid page reload
    const response = await fetch("http://localhost:5000/api/auth/createuser", {          // endpoint daal diya backend k signup   page ka
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'                
        },
        body: JSON.stringify({name, email, password})       // ye body banai jiske through name, email aur password ko bhej rhe hain client side se backend me
    });
    const json = await response.json()       // respnse ko console kara diya
    console.log(json);
    if (json.success){                                         //agar user verification ho gayi to  
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        Navigate("/");       // usko uske page par navigate kar denge , jahan uske notes hain
        props.showAlert("Account Created Successfully", "success")    //signup alert
    }
    else{                                       // if email password invalid
        props.showAlert("Invalid Credentials", "danger")              // signup alert
    }                      
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})      // user jab kuch change karega to onchange func call hoga aur state change ho jayegi form ki
}

  return (
    <div className="container mt-5">
       <h2 >  SignUp to Continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup