import {GET_SUCCESS, SET_SUCCESS} from "../actions/actionTypes";

const initialState = {
    firstName : "",
    lastName : "",
    birthday : "",
    job : "",
    country : "",
    relationship : "",
    gender : "",
};

export default (state=initialState,action) => {
    switch(action.type){
        case GET_SUCCESS:
        return {
            ...state,
            firstName : action.profile.firstName,
            lastName : action.profile.lastName,
            birthday : action.profile.birthday,
            job : action.profile.job,
            country : action.profile.country,
            relationship : action.profile.relationship,
            gender : action.profile.gender
        }
        case SET_SUCCESS:
        return {
            ...state,
            firstName : action.profile.firstName,
            lastName : action.profile.lastName,
            birthday : action.profile.birthday,
            job : action.profile.job,
            country : action.profile.country,
            relationship : action.profile.relationship,
            gender : action.profile.gender
        }
        default :
         return state
    }
}