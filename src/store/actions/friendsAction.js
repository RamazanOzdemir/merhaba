import {GET_FRIEND_REQUEST,GET_FRIEND_SUCCESS,GET_FRIEND_FAIL,
    CANCEL_FRIEND_REQUEST,CANCEL_FRIEND_SUCCESS,CANCEL_FRIEND_FAIL} from "./actionTypes";

const getRequest = () => ({
    type : GET_FRIEND_REQUEST
});

const getSuccess = () => ({
    type : GET_FRIEND_SUCCESS
});

const getFail = () => ({
    type : GET_FRIEND_FAIL
});

export const requestFriends = (my,friend,status)=>((dispatch,getState,{getFirebase,getFirestore})=>{
    const firestore = getFirestore();
    dispatch(getRequest());
    
    firestore.collection('friends').doc(my[0]).set({[friend.uid]:{...friend,friend:status==="request"?"outgoing":"OK"}},{merge:true})
    .then(()=>firestore.collection('friends').doc(friend.uid)
                .set({[my[0]]:{uid:my[0],firstName:my[1].firstName,lastName:my[1].lastName,friend:status==="request"?"incoming":"OK"}},{merge:true}))
                .then(()=>dispatch(getSuccess()))
    .catch(()=>dispatch(getFail())); 
});
const cancelRequest = () => ({
    type : CANCEL_FRIEND_REQUEST
});

const cancelSuccess = () => ({
    type : CANCEL_FRIEND_SUCCESS
});

const cancelFail = () => ({
    type : CANCEL_FRIEND_FAIL
});

export const cancelFriends = (my,friend)=>((dispatch,getState,{getFirebase,getFirestore})=>{
    console.log(my)
    const fb = getFirebase();
    const firestore = getFirestore();
    dispatch(cancelRequest());
   
    firestore.collection('friends').doc(my[0]).set({[friend.uid]:fb.firestore.FieldValue.delete()},{merge:true})
    .then(()=>firestore.collection('friends').doc(friend.uid)
                .set({[my[0]]:fb.firestore.FieldValue.delete()},{merge:true})
                .then(()=>dispatch(cancelSuccess())))
    .catch(()=>dispatch(cancelFail())); 
});
