import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{  //yahan ek s1 naam ka constantt banaya jisi value about me use ho thi hai
    const s1 = {
        "name": "shubham",
        "class": "5b"
    }
    const [state, setState] = useState(s1)
    const update = ()=>{          //ye ek funstion hai jise ham use karenge about me
        setTimeout(()=>{             //update function jahan use hoga wahan state 1 sec baad change kar dega
            setState({
                "name": "Larry",
                "class": "10b"
            })
        }, 1000);  
    }
    return(
        // context api ki help se hamne is state ko un sab components ko available kara dia jo wrapped hai notecontext tag me
        <NoteContext.Provider value={{state, update}}>   {/*state aur update sabhi components me ab use kiye ja skte hain*/}
            {props.children}
        </NoteContext.Provider>
        // jab bhi ham kisi cheez ko is context me wrap karenge uske beech me automatically sabhi children a jayenge
    )
}

export default NoteState;


//hamne ye function banaya jisme value me state daal di kyoki ham use change krna chahenge