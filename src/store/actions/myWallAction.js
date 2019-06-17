import {SET_MYWALL_REQUEST,SET_MYWALL_SUCCESS,SET_MYWALL_FAIL,
        LIKE_ADD_REQUEST,LIKE_ADD_SUCCESS,LIKE_ADD_FAIL,
        DELETE_SHARE_REQUEST,DELETE_SHARE_SUCCESS,DELETE_SHARE_FAIL} from "./actionTypes";


const setRequest = () => ({
    type : SET_MYWALL_REQUEST 
});

const setSuccess = (share) => ({
    type : SET_MYWALL_SUCCESS,
    share : Object.entries(share)
});

const setFail = () => ({
    type : SET_MYWALL_FAIL,
});

export const setMyWall = (uid,share) => (dispatch,getState,{getFirebase,getFirestore})=>{
    dispatch(setRequest());
    const fs = getFirestore();
    const myWallRef=fs.collection("myWall")
    
    myWallRef.doc(uid).set(share,{merge:true})
    .then(()=>dispatch(setSuccess(share)))
    .catch((err)=>dispatch(setFail()))
    fs.collection("myWall").where("doc","==",uid).onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>console.log(change.doc.data()))
        })

};

const likeRequest = () => ({
    type :LIKE_ADD_REQUEST
});
const likeSuccess = (nw) => ({
    type :LIKE_ADD_SUCCESS,
    newLikeCount : Object.entries(nw)
});
const likeFail = () => ({
    type :LIKE_ADD_FAIL
});

export const addLike = (uid,newLikeCount) =>(dispatch,getState,{getFirebase,getFirestore})=>{
    dispatch(likeRequest());
    const fs=getFirestore();
    fs.collection("myWall").doc(uid).set(newLikeCount,{merge:true})
    .then(()=>dispatch(likeSuccess(newLikeCount)))
    .catch(err=>dispatch(likeFail));
};

const deleteRequest = ()=>({
    type : DELETE_SHARE_REQUEST
});

const deleteSuccess = image=>({
    type : DELETE_SHARE_SUCCESS,
    image
});

const deleteFail = ()=>({
    type : DELETE_SHARE_FAIL
});

export const deleteShare = (uid,image)=>(dispatch,getState,{getFirebase,getFirestore})=>{
    const fb = getFirebase(); 
    const fs = getFirestore();
    const shareRef=fs.collection("myWall").doc(uid);  
    dispatch(deleteRequest());
    shareRef.set({[image] :fb.firestore.FieldValue.delete()},{merge:true})
   .then(()=>dispatch(deleteSuccess(image)))
   .catch(err=>dispatch(deleteFail()));
 
};