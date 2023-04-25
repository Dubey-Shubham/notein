import React, { useContext, useEffect, useRef, useState } from "react";     //useRef hook se ham kisi bhi ek element ko reference de sakte hai
import NoteItem from "./Noteitem";
import noteContext from "../context/notes/noteContext"; //context api use kar di yahan par
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom'

function Notes(props) {
  const context = useContext(noteContext); // const context me noteContext daal diya
  let Navigate = useNavigate();               // hook navigate krne k liye
  const { notes, getNotes, editNote} = context; // jo state banayi thi notesstate me context api se wo yahan use krli
  useEffect(() => {
    //yahan effects ki help se client side pe notes ko render kar diya yahan
    if(localStorage.getItem('token')){           //yahan agar localstorage me token hai to notes dedo
      getNotes()                                 
    }
    else{
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null)
  const refClose = useRef(null)       // modal ko close krne k liye
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })       // title, description, tag  ki state bana rakhi hai

  const updateNote = (currentNote) => {             
    ref.current.click();                             // click krne par modal khulega
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })   //modal me already title wagera daal denge jo pehle se note me tha, kyuki purani detail ko hi edit karenge na 
  }

  const handleClick = (e) => { 
    editNote(note.id, note.etitle, note.edescription, note.etag);  //ye sabhi edit note function as a input lega aur notestate me pass kar dega
    refClose.current.click();                       //ye click hoyega ab , button work karega
    props.showAlert("Updated Successfully", "success")          // edit ka click krte hi alert show ho jayega
  }

  const onChange = (e) => {                                    //button click krne par ye function call hoga, event pass ho rha hai isme
    setNote({ ...note, [e.target.name]: e.target.value })        // here we are saying ki jo property likhi hai note me wo yahan rahe, par aage likhi hui override ho jaye, ... is spread operator
  }

  return (
    <>
       <AddNote showAlert={props.showAlert} />     {/*note add karne wala component hai ye, yaha alert ka prop drill kr diya*/}
       {/* ye model dala bootstrap se jo editing k liye khul jayega */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* is button ko ham show nhi karenge(class me display-nome) but ham isko programically click karayenge, reference yahan button ko hold kar rha hai*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          {/* ye form seedha addnote wala hi yahan add kar dia modal me */}
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'no notes to display'}      {/*agar notes empty hai to simply display no notes*/}
                </div>
                {notes.map((note) => {   // yahin se hi render ho rhe hai notes client side pe
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />  //noteitem naam ka jo card banaya hai use ham render kar rhe hain, aur isme as a prop note, delete note wagera bhej rhe hain
                                                  // alert ka prop bhi drill kr diya yahan
                })}
            </div>
            </>
  );
}

export default Notes;
