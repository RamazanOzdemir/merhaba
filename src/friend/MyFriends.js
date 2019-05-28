import React from 'react'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import ListMyFriends from '../layout/ListMyFriends';
import SearchBar from '../layout/SearchBar';
import {Redirect} from "react-router-dom";

function MyFriends(props) {
  const {friends,auth} = props
 
  let myFriends = friends?Object.entries(friends):[];
  myFriends = myFriends.filter(friend=>friend[1].friend==="OK")
  if(auth.isEmpty) return <Redirect to="/login"/>
  else
  return (
    <div className="container">
    <div className="row">
      <div className="col s10 l8 offset-l2 offset-s1">
        <SearchBar history={props.history}/>
      </div>
      {myFriends.length? 
        <div className="col s10 l8 offset-l2 offset-s1">
          <ListMyFriends myFriends={myFriends} key="myFriends"/>
        </div>
        :
        <div className="col s10 l8 offset-l2 offset-s1">
            <h4 className="handWrite">Hiç Arkadaşın Yok Hemen Birilerini ekle :)</h4>
        </div>
    }
    
    </div>
  </div>
  )
}

const mapStateToProps = state => {

    return{
    auth : state.firebase.auth,
    friends : state.firestore.data.myFriends
}};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        
    ])
    )(MyFriends);
