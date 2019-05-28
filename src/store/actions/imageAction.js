import {SET_PROGRESS,GET_IMG_REQUEST,GET_IMG_SUCCESS,GET_IMG_FAIL,
        SET_IMG_REQUEST,SET_IMG_SUCCESS,SET_IMG_FAIL,
        DELETE_IMG_REQUEST,DELETE_IMG_SUCCESS,DELETE_IMG_FAIL} from "./actionTypes";

const setProgress= (percentage)=>({
    type : SET_PROGRESS,
    percentage
});

const getRequest = () => ({
    type : GET_IMG_REQUEST
});

const getSuccess = (data) => ({
    type : GET_IMG_SUCCESS,
    images : Object.entries(data)
});

const getFail = () => ({
    type : GET_IMG_FAIL
});

export const getImages = (uid)=>((dispatch,getState,{getFirebase,getFirestore})=>{
    dispatch(getRequest());
    const fs=getFirestore();
    fs.collection("images").doc(uid).get()
    .then(snapshot=>dispatch(getSuccess(snapshot.data())))
    .catch((err)=>dispatch(getFail()));
    
    
});

const setRequest = () => ({
    type : SET_IMG_REQUEST
});

const setSuccess = images => ({
    type : SET_IMG_SUCCESS,
    images
});

const setFail = () => ({
    type : SET_IMG_FAIL
});

export const setImages = (uid,files)=>(dispatch,getState,{getFirebase,getFirestore})=>{
     dispatch(setRequest());
    
   const fs=getFirestore();
   const storage= getFirebase().storage();
   files.forEach(file=>{
    const storeImgRef = storage.ref(`${uid}/${file.name}`);
    const task =storeImgRef.put(file);
    const fileName = file.name;
    const dot = fileName.indexOf(".");
    const name = fileName.slice(0,dot);
    task.on("state_changed",
 
     function progress (snapshot){
        const percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        dispatch(setProgress(percentage))
     },
     function error (err){
         dispatch(setFail());
     },
     function complete (){
         task.snapshot.ref.getDownloadURL().then(
            downloadURL=>{
                fs.collection("images").doc(uid).set({[name]:downloadURL},{merge:true})
                .then(()=>dispatch(setSuccess([[name],[downloadURL]])))
               
            }
         )
         
     }
   );
   })   
};

const deleteRequest = ()=>({
    type : DELETE_IMG_REQUEST
});

const deleteSuccess = image=>({
    type : DELETE_IMG_SUCCESS,
    image
});

const deleteFail = ()=>({
    type : DELETE_IMG_FAIL
});

export const deleteImage = (uid,image)=>(dispatch,getState,{getFirebase,getFirestore})=>{
   const fb = getFirebase();
   const fs = getFirestore();
   var imageRef=fs.collection("images").doc(uid); 
   const shareRef=fs.collection("myWall").doc(uid); 
   const desertRef = fb.storage().ref(`${uid}/${image}.jpg`);
   dispatch(deleteRequest());
   desertRef.delete()
   .then(()=>{
       imageRef.set({[image] :fb.firestore.FieldValue.delete()},{merge:true})
       .then(()=>{
        shareRef.set({[image] :fb.firestore.FieldValue.delete()},{merge:true});   
        dispatch(deleteSuccess(image))});
   })
   .catch((err)=>dispatch(deleteFail()));
};
