import {GET_REQUEST,GET_SUCCESS,GET_FAIL,SET_REQUEST,SET_SUCCESS,SET_FAIL} from "./actionTypes";

const getRequest = () => ({
    type : GET_REQUEST
});

const getSuccess = (profile) => ({
    type : GET_SUCCESS,
    profile 
});

const getFail = () => ({
    type : GET_FAIL
});

export const getProfile = (uid)=>((dispatch,getState,{getFirebase,getFirestore})=>{
   
    const firestore = getFirestore();
    dispatch(getRequest());
    firestore.collection("profiles").doc(uid).get()
    .then(snapshot=>dispatch(getSuccess(snapshot.data())))
    .catch(()=>dispatch(getFail()))
    
});

const setRequest = () => ({
    type : SET_REQUEST
});

const setSuccess = (profile) => ({
    type : SET_SUCCESS,
    profile
});

const setFail = () => ({
    type : SET_FAIL
});

export const setProfile = (uid,profile)=>((dispatch,getState,{getFirebase,getFirestore})=>{
    dispatch(setRequest());
    const firestore = getFirestore();
    firestore.collection("profiles").doc(uid).set(profile)
    .then(()=>dispatch(setSuccess(profile)))
    .catch(()=>dispatch(setFail()));
   
});