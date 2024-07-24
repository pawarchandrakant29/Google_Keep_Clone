import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export const FETCH_NOTES = 'FETCH_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export const fetchNotes = () => async dispatch => {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: FETCH_NOTES, payload: notes });
};

export const addNote = (note) => async dispatch => {
  const docRef = await addDoc(collection(db, "notes"), note);
  dispatch({ type: ADD_NOTE, payload: { id: docRef.id, ...note } });
};

export const deleteNote = (id) => async dispatch => {
  await deleteDoc(doc(db, "notes", id));
  dispatch({ type: DELETE_NOTE, payload: { id } });
};

export const editNote = (id, updatedNote) => async dispatch => {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, updatedNote);
  dispatch({ type: EDIT_NOTE, payload: { id, ...updatedNote } });
};


export const authenticate = (email, password, type) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (type === "signup") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(`${type} Success:`, res.user);
            dispatch({
              type: "SIGNUP_SUCCESS",
              payload: res.user,
            });
            resolve(res.user);
          })
          .catch((error) => {
            console.error(`${type} Error:`, error.message);
            dispatch({
              type: "SIGNUP_ERROR",
              payload: error.message,
            });
            reject(error);
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(`${type} Success:`, res.user);
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: res.user,
            });
            resolve(res.user);
          })
          .catch((error) => {
            console.error(`${type} Error:`, error.message);
            dispatch({
              type: "LOGIN_ERROR",
              payload: error.message,
            });
            reject(error);
          });
      }
    });
  };
};

export const signout = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Logout Success");
          dispatch({
            type: "LOGOUT_SUCCESS",
          });
          resolve();
        })
        .catch((error) => {
          console.error("Logout Error:", error.message);
          dispatch({
            type: "LOGOUT_ERROR",
            payload: error.message,
          });
          reject(error);
        });
    });
  };
};

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};
