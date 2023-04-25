import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext"; //context api use kar di yahan par

function Noteitem(props) {  // ye card banaya hai jo use kiya gya hai notes me, isi card me notes show honge
  const context = useContext(noteContext); // const context me noteContext daal diya
  const {deleteNote}= context;  //note state se delete note use kiya
  const { note, updateNote } = props;         //as a prop note aur upxatenote le lia 
  return (
    <div className="col-md-3">
    <div className=" my-3" >
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>   
        <p className="card-text">
          {note.description}
        </p>
        {/* delete button me props ki help se alert laga diya  */}
        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>  {/*click krne par delete note call ho jayega aur usko id mil jayegi nte ki jise hame delete krna hai*/}
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>       {/*click krne par update note call ho jayega aur usko id mil jayegi note ki jise hame delete krna hai*/}
      </div>
    </div>
    </div>
  );
}

export default Noteitem;
