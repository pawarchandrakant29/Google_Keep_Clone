import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, deleteNote } from '../redux/actions/noteActions';
import './input.css'; 

function NoteContainer() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="note-container">

      {notes.map((note) => (
        <div
          key={note.id}
          className={`note ${note.selectedImage ? 'with-image' : ''}`}
          style={{ 
            backgroundColor: note.color, 
            backgroundImage: note.backgroundImage ? `url(${note.backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {note.selectedImage && (
            <img src={note.selectedImage} alt="Note" />
          )}
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteContainer;
