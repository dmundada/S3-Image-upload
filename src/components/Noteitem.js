import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
      <div className="card note-item">
            <h5 className="bold">Title: {note.title}</h5>
            <p className="card-text">Description: {note.description}</p>
            <div className="icon-group">
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully","success")
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
      </div>
  );
};

export default Noteitem;
