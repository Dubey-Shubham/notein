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



function App() { 
  return (
    <>
    {/* hamne sabhi components ko notestate me wrap kar dia so that notestate k andar k state variable sabhi components plus unke children components me uplabdh ho jaye */}
    <NoteState>    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* <Route exact path="/navbar" element={<Navbar/>} /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
