import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function Navbar() {
  let Navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');            // authtoken remove kara
    Navigate("/login");                 // login page pe navigate kr diya
  }
  let location = useLocation();         //use location hook ko use kiya aue location variable me store kar dia location ko                        
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/navbar">
            NoteIn
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active" :""}`} aria-current="page" to="/">  {/*agar location.pathname home ka hai tp active string pass krdo so that navbar me dark ho jaye*/}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">   {/*backtick me inclose krke ternery operator ko use kar diya*/}
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">                                       {/*agar localstorage me token nhi hai to login signup dikhao warna logout button dikhao*/}
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
            </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}            {/* logout button jise click krte hi handlelogout func call ho jayega*/}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
