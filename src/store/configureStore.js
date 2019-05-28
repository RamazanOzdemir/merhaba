import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {firebaseReducer,getFirebase,reactReduxFirebase} from "react-redux-firebase";
import {getFirestore,reduxFirestore, firestoreReducer} from "redux-firestore";
import fbConfig from "../config/fbConfig";
import signupReducer from "./reducers/signupReducer";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import imagesReducer from "./reducers/imagesReducer";
import friendsReducer from "./reducers/friendsReducer";
import wallReducer from "./reducers/wallReducer";
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer,
    signup : signupReducer,
    login : authReducer,
    profile : profileReducer,
    images : imagesReducer,
    friends : friendsReducer,
    wall : wallReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default ()=>createStore(rootReducer,
    composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig,{attachAuthIsReady:true})
    
    )
);