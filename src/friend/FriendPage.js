import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import Profile from "../layout/Profile";
import ImageCard from "../layout/ImageCard";
import  M from "materialize-css";
import {Redirect} from "react-router-dom";

class FriendPage extends Component {

  componentDidMount = () =>{
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);

  
 
  }  

  render() {
      const {profile,friendWall,auth} = this.props;
      const {uid} = this.props.match.params;
      let wall = friendWall?Object.entries(friendWall[0]?friendWall[0]:{}):[];
      wall = wall.filter(item=>item[0]!=="id")
    if(auth.isEmpty) return <Redirect to="/login"/>
    else
    return (
    //Profil bilgileri
      <div className="container">
          <hr/>
          <p>Profil Bilgileri :</p>
          <hr/>
          <Profile profile={profile}/>
          
          <hr/>
          <p>Resimleri :</p>
          <hr/>
          <div>
          {
            wall?
            
            <div className="col s12" >
                  {
                    wall.map(item=>(
                      <ImageCard
                        key ={item[0]+"myPage"}
                        item={item}
                        friendUid = {uid}
                        isMy = {false}
                       />
                
                    ))
                  }
                
              
            </div>
            :
            <div className="col s12" >
            <div className="spinner-layer spinner-red">
              
              <div className="circle-clipper left">
                 <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
           </div></div>
          }
          </div>
      </div>
    )
  }
}

const mapStateToProps = state =>{
 return  {
    profile : state.firestore.data.friendProfile,
    images : state.images.images,
    auth : state.firebase.auth,
    friendWall : state.firestore.ordered.friendWall,

}}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props=>{
    const {uid} = props.match.params;
    return [{collection:"profiles" ,doc:uid,storeAs:"friendProfile"},
            {collection:"myWall" ,doc:uid,storeAs:"friendWall"}]
    
  })
  ) (FriendPage);
