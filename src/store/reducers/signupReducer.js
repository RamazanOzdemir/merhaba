import {SIGNUP_SUCCESS,SIGNUP_FAIL} from "../actions/actionTypes";

const initialState = {
    signupError : null
};

export default (state=initialState,action)=>{
    switch (action.type){
        case SIGNUP_SUCCESS :
        return{
            ...state,
            signupError : null
        }
        case SIGNUP_FAIL : 
        return{
            ...state,
            signupError : action.err
        }
        default : 
        return state
    }
};