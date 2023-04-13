import { createContext } from "react";

const noteContext = createContext();   //yahan ek context ko janam diya hamne (create kiya)

export default noteContext;


// yahan ek context api banayi aur use export kar diya, so that ham use kar sake
//createContext ek hook hai jise import krke use kiya hai
//is file ka code notestate me bi likh sakte the par yahan context banake is file ko multipefile me import krke use kr sakte hain