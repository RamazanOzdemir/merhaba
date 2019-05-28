import {LOGIN_SUCCESS,LOGIN_FAIL} from "../actions/actionTypes"

const initialState ={
    loginError : null
}

export default (state=initialState,action)=>{
    switch (action.type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                loginError : null
            }
        case LOGIN_FAIL : 
            return{
                ...state,
                loginError : action.err
            }
        default:
        return state
    }

}