import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = []; //array is empty

  const [notes, setNotes] = useState(notesInitial); //notes naam ki state bana di

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {       //fetch note ka url hai yahan
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),     //ab token local storage se ayega
      },
    });
    const json = await response.json();                          //json me response store ho jayega
    console.log(json);
    setNotes(json);                                      // aur ye notes json ki form me state change krke a jayenge screen par
  };

  // Add a Note function
  const addNote = async (title, description, tag) => {
    // hame har ek note me teen cheeze milengi

    const response = await fetch(`${host}/api/notes/addnote`, {
      //update notes ka url daal diya port upar daal rakha hai aur id har note ki mil hi jayegi
      method: "POST", // method post hai iska
      headers: {
        // headers jo backend me bhi daale the
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // isko string ki form me badal k database me daal denge
    });
     const note = await response.json();     // json me response ki value store kara di 
     setNotes(notes.concat(note)); // yahan note array me note ko push kar dia aur note state ko update kardo
  };

  // Delete a Note function
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      //delete notes ka url daal diya port upar daal rakha hai aur id har note ki mil hi jayegi
      method: "DELETE", // method post hai iska
      headers: {
        // headers jo backend me bhi daale the
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }
    });
    const json =  await response.json();
    console.log(json)
    
    console.log("Deleting the note with id"+ id);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    }); //agar note_id id k barabar nhi hai to wo notes k andar rahega warna nahi(agar dono id barabar hai to notes delete ho jyegi)
    setNotes(newNotes) // notes ki state update kardi
  }
  
  
  // Edit a Note function
  const editNote = async (id, title, description, tag) => {
    // sabhi parameter function me pass kiye ja rhe hain

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      //update notes ka url daal diya port upar daal rakha hai aur id har note ki mil hi jayegi
      method: "PUT", // method post hai iska
      headers: {
        // headers jo backend me bhi daale the
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json(); //data ko json ki form me as a response bhej diya jayega
    console.log(json)     // warning hatane k liye no special purpose
    

    // react me directly state ko ham change nhi kr sakte, neeche banaya gya code front me bina load kare notes me changes show kr dega
    let newNotes = JSON.parse(JSON.stringify(notes))    //notes ko stringfy kar dia aur parse krke uski deep copy bana di
    for (let index = 0; index < newNotes.length; index++) {
      //loop notes me jo likha hai uske first word se last word tak chalega kyuki words ko hi ham edit kar rhe hain
      const element = newNotes[index]; //element me notes ka index store kar dia
      if (element._id === id) {
        // agar is index wale note ki id same hai to notes edit honge
        newNotes[index].title = title                   //notes array k jis index pe bola wahi edit karenge
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    // context api ki help se hamne is state ko un sab components ko available kara dia jo wrapped hai notecontext tag me
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {" "}
      {/*notes sabhi components me ab use kiye ja skte hain*/}
      {props.children}
    </NoteContext.Provider>
    // jab bhi ham kisi cheez ko is context me wrap karenge uske beech me automatically sabhi children a jayenge
  );
};

export default NoteState;

//hamne ye function banaya jisme value me state daal di kyoki ham use change krna chahenge
