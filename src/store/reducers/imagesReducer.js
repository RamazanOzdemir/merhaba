import {SET_PROGRESS,GET_IMG_SUCCESS, SET_IMG_SUCCESS,DELETE_IMG_SUCCESS} from "../actions/actionTypes";

const initialState = {
   images : [],
   percentage : 0
};

export default (state=initialState,action) => {
    switch(action.type){
        case GET_IMG_SUCCESS:
        
        return {
            ...state,
            images : action.images
            
        }
        case SET_IMG_SUCCESS:
        return{
            ...state,
            images : [...state.images,action.images]
        }
        case SET_PROGRESS:
        return{
            ...state,
            percentage : action.percentage
        }
        case DELETE_IMG_SUCCESS:
        return{
            ...state,
            images : state.images.filter(image=>image[0] !== action.image)
        }
        default :
         return state
    }
}