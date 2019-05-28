import {SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL} from "./actionTypes";

const signupRequest = () =>({
    type : SIGNUP_REQUEST
});

const signupSuccess = () =>({
    type : SIGNUP_SUCCESS
});

const signupFail = (err) =>({
    type : SIGNUP_FAIL,
    err
});

export const signupUser = (email,password,profile) =>((dispatch,getState,{getFirebase,getFirestore})=>{
    dispatch(signupRequest());
    const firebase = getFirebase();
    const firestore=getFirestore();
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then( res =>{
        const uid = res.user.uid;
        firestore.collection("profiles").doc(uid).set(profile)
        .then(()=>dispatch(signupSuccess()))
        })
    .catch(error => {
        const errorCode = error.code;
        var errorMessage = error.message;
         if (errorCode === 'auth/email-already-in-use') 
            dispatch(signupFail('Bu email başka bir kullanıcı tarafından kullanılmaktadır.'));
         else if (errorCode === 'auth/invalid-email')
         dispatch(signupFail('Lütfen geçerli bir Email girin.'));
         else 
             dispatch(signupFail(errorMessage));
        
    });
   
    
});