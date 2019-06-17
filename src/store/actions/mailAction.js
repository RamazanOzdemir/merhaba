export const sendMail = (from,to,x,y)=>((dispatch,getState,{getFirebase,getFirestore})=>{
    const fs = getFirestore().collection("email");
    fs.doc(from).set({[to]:x},{merge:true})
    .then(()=>fs.doc(to).set({[from]:y},{merge:true}))
    .catch((err)=>console.log(err));
   
});