import {GET_WALL_REQUEST,GET_WALL_SUCCESS,
    SET_WALL_REQUEST,SET_WALL_SUCCESS,SET_WALL_FAIL} from "./actionTypes";

const getRequest = () => ({
type : GET_WALL_REQUEST 
});

const getSuccess = Wall=> ({
type : GET_WALL_SUCCESS,
Wall 
});



export const getWall = (uid,myFrineds) => (dispatch,getState,{getFirebase,getFirestore})=>{
dispatch(getRequest());
const fs = getFirestore();
fs.collection("myWall").onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
      if(change.type === "added"){
        const arrayDoc = Object.entries(change.doc.data())
 
        const isFriend = myFrineds.some(friend=>(friend[0]===change.doc.id)||uid ===change.doc.id);
        const freshShare = arrayDoc.filter(share=>share[1].createdDate < Date.now());

        if(isFriend){
            
            dispatch(getSuccess(freshShare))
        }
     }
    })
})
};


const setRequest = () => ({
type : SET_WALL_REQUEST 
});

const setSuccess = (share) => ({
type : SET_WALL_SUCCESS,
share : Object.entries(share)
});

const setFail = () => ({
type : SET_WALL_FAIL,
});

export const setMyWall = (uid,share) => (dispatch,getState,{getFirebase,getFirestore})=>{
dispatch(setRequest());
const fs = getFirestore();
fs.collection("myWall").onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(doc=>console.log(doc.data()))
})

fs.collection("myWall").doc(uid).set(share,{merge:true})
.then(()=>dispatch(setSuccess(share)))
.catch((err)=>dispatch(setFail()));

};



