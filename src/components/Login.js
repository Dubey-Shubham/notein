import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})     //credentials naam ki state bnai aur usme initialy state ek object k form me daal di (initial state empty hai email aur password ki)
    let Navigate = useNavigate();

    const handleSubmit = async (e) => {                // e stands for event
        e.preventDefault();                             // will avoid page reload
        const response = await fetch("http://localhost:5000/api/auth/login", {          // endpoint daal diya login page ka
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})       // ye body banai jiske through email aur password ko bhej rhe hain client side se backend me
        });
        const json = await response.json()       // respnse ko console kara diya
        console.log(json);
        if (json.success){                                         //agar user verification ho gayi to  
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);       //ham token ko pehle save kar rhe hai phir redirect kar rhe hai
            Navigate("/");       // usko uske page par navigate kar denge , jahan uske notes hain
            props.showAlert("Logged In Successfully", "success")             //login alert
        }
        else{                                       // if email password invalid
            props.showAlert("Invalid details", "danger")
        }                      
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})      // user jab kuch change arega to onchange func call hoga aur state change ho jayegi form ki
    }
    
    return (
        // simple bootstrap form
        <div className="mt-5">   
            <h2>Login to Continue</h2>
            <form onSubmit={handleSubmit}>    {/*form submit hone par ye function call ho jayega*/}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />    {/*form imput me value dalegi aur onchange lagaya hai state change karwane k liye*/}
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login