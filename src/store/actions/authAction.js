import { LOGIN_REQUEST ,LOGIN_SUCCESS,LOGIN_FAIL} from "./actionTypes";

const loginRequest =()=>({
    type : LOGIN_REQUEST
});

const loginSuccess = () =>({
    type : LOGIN_SUCCESS
});

const loginFail = (err) =>({
    type : LOGIN_FAIL,
    err
});

export const checkUser= (email,password)=>((dispatch,getState,{getFirebase,getFirestore}) => {
    dispatch(loginRequest());
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>dispatch(loginSuccess()))
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-email')
           dispatch(loginFail("Geçersiz Email!"));
        else if (errorCode === 'user-not-found')
           dispatch(loginFail("Geçersiz Email!"));
        else if (errorCode === 'auth/wrong-password')
           dispatch(loginFail("Hatalı Şifre"));
        else 
            dispatch(loginFail(errorMessage));
        });
    
});
export const logOut = ()=>((dispatch,getState,{getFirebase})=>{
    const firebase = getFirebase();
    firebase.auth().signOut();
});
export const sendVerifedLink = ()=> ((dispatch,getState,{getFirebase,getFirestore}) =>{
    const firebase=getFirebase();

    firebase.auth().currentUser.sendEmailVerification();
    console.log(firebase.auth().currentUser);
});