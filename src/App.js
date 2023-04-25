import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() { 
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{        //funstion bnaya jo initial alert ko set karega 
    setAlert({                                // is function me setalert state alert ki initial state set kr degi 
      msg:message,
      type: type
    })
    setTimeout(()=>{                //alert ko apne app vanish karane k liye timeout lagaya
      setAlert(null);
    },1500);
  }

  return (
    <>
    {/* hamne sabhi components ko notestate me wrap kar dia so that notestate k andar k state variable sabhi components plus unke children components me uplabdh ho jaye */}
    <NoteState>    
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>            {/*alert component yahan navbar k neeche dikhega*/}
    <div className="container">
      <Routes>
        {/* <Route exact path="/navbar" element={<Navbar/>} /> */}
        <Route exact path="/" element={<Home showAlert={showAlert}/>} />              {/*prop drill kr diya shoe alert ka home login aur signup me*/}
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
