import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import Profile from "../layout/Profile";
import ImageCard from "../layout/ImageCard";
import  M from "materialize-css";
import {Redirect} from "react-router-dom";

class MyPage extends Component {

  componentDidMount = () =>{
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);

  }  

 

  render() {
    const {profile,myWall,uid} = this.props;
  let wall = myWall.length>0?Object.entries(myWall[0]):[];
      wall = wall.filter(item=>item[0]!=="id")
 
  if(!uid) return <Redirect to="/login"/>
  else
    return (
    //Profil bilgileri
      <div className="container">
          <hr/>
          <p>Profil Bilgileri :</p>
          <hr/>
          <Profile profile={profile}/>
          <div className="col s12 input-field center">
              <Link className="btn" to="/setProfile" >Profilini Düzenle</Link>
            </div>
          <hr/>
          <p>Resimlerim :</p>
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
                        isMy = {true}
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
  const db = state.firestore;
 return  {
    profile : db.data.profile,
    images : state.images.images,
    uid : state.firebase.auth.uid,
    myWall : db.ordered.Wall?db.ordered.Wall:[],
  
}}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props=>{
    const {uid} = props
    return [{collection:"profiles" ,doc:uid,storeAs:"profile"},
            {collection:"myWall" ,doc:uid,storeAs:"Wall"}]
    
  })
  ) (MyPage);
