import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext"; //context api use kar di yahan par
import { useState } from "react";

function AddNote() {
  const context = useContext(noteContext); // const context me noteContext daal diya
  const { addNote } = context; // jo state banayi thi notesstate me context api se wo yahan use krli

  const [note, setNote] = useState({ title: "", description: "", tag: "" })        //initial state is blank, blank set krdi hamne initial state

  const handleClick = (e) => {       // e is for event
    e.preventDefault();                                      // page reload avoid krne k liye
    addNote(note.title, note.description, note.tag);           // click krne par ye fields as a note add ho jayenge
    setNote({title: "", description: "", tag: ""})           //click krne k baad sabhi entrybox khali ho jaye bas
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });  // here we are saying ki jo property likhi hai note me wo yahan rahe, par aage likhi hui override ho jaye, ... is spread operator
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            minLength={5} required  value={note.title}
            onChange={onChange}                        // on change par click hote hi onchange function call ho jayega
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5} required value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange} value={note.tag}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
