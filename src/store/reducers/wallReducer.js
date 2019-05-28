import {GET_WALL_SUCCESS,SET_MYWALL_SUCCESS,LIKE_ADD_SUCCESS,DELETE_SHARE_SUCCESS} from "../actions/actionTypes"

const initialState = {
    myWall : []
}
 
export default (state=initialState,action) => {
    switch(action.type){
        case GET_WALL_SUCCESS:
        return{
            ...state,
            myWall : state.myWall.filter(item=>action.Wall.every(element=> element[1].uid!==item[1].uid)).concat(action.Wall)
        }
        case SET_MYWALL_SUCCESS:
        return{
            ...state,
            myWall : [...state.myWall,action.share[0]]
        }
        case LIKE_ADD_SUCCESS:
        return{
            ...state,
            myWall : state.myWall.filter(item=>action.newLikeCount[0][1].url!==item[1].url).concat(action.newLikeCount)
        }
        case DELETE_SHARE_SUCCESS:
        return{
            ...state,
            myWall : state.myWall.filter(image=>image[0] !== action.image)
        }
        default:
        return state
    }
}

