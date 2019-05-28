import {GET_SUCCESS} from "../actions/actionTypes";

const initialState = {
   friends : []
};

export default (state=initialState,action) => {
    switch(action.type){
        case GET_SUCCESS:
        return {
            ...state,
            friends : action.friends
        }
        default :
         return state
    }
}