import React,{Component} from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux"
import {firestoreConnect} from "react-redux-firebase"
import {logOut,setProfile,requestFriends,cancelFriends,getWall} from "../store/actions"
import M from "materialize-css";
import RequestList from './RequestList';
import { isArray } from 'util';


class LoginLinks extends Component {

  componentDidMount = async()=>{
    
    const elems = document.querySelectorAll('.dropdown-trigger');
    const options ={constrainWidth:false,alignment:"center",coverTrigger:false}
     M.Dropdown.init(elems, options);
     

  }

  render(){
    const {friends,requestFriends,cancelFriends,my,avatar,myMail} = this.props;
    let myFriends = friends ? Object.entries(friends[0]?friends[0]:{}) : [];
    myFriends.shift();
    const incoming = myFriends.filter(friend=>friend[1].friend==="incoming");
    const outgoing = myFriends.filter(friend=>friend[1].friend==="outgoing");
    const incomingLength = incoming.length;
    let count=0;
    let mail = myMail?Object.entries(myMail[0]?myMail[0]:{}):[];        
    mail.forEach(element=>{
      if(isArray(element[1]))
      element[1].forEach(message=>{
        if(!message.isRead){
           count++;
        }
         
      })
    })
  return (
         <ul className="right" >
          <li className="hide-on-med-and-down handWrite"><NavLink to="/home">Ana Sayfa</NavLink></li>
          <li className="hide-on-med-and-down handWrite"><NavLink to="/">Benim Sayfam</NavLink></li>
          <li className="hide-on-med-and-down handWrite"><NavLink to="/uploadImg">Resimlerim</NavLink></li>
          <li className="hide-on-med-and-down handWrite"><NavLink to="/myFriends">Arkadaşlarım</NavLink></li>
          <li><NavLink to="/emails"><i className="material-icons">email</i></NavLink></li>
          <li >{incomingLength?<span className=" badge red white-text circle ">{incomingLength}</span>:null}
          <a href="#!"className="dropdown-trigger" data-target='friendship'><i className="material-icons">group_add</i></a>
          </li>
          <li><button  className="btn btn-floating btn-large lighten-3 dropdown-trigger "  data-target='dropdown1'>
            {avatar}
          </button></li>
          <ul id='dropdown1' className='dropdown-content' style={{padding:"10px"}}>
            <li><NavLink to="/setProfile"  >Profilim</NavLink></li>
           
            <li className="divider" tabIndex="-1"></li>

            <li><a href="#!" onClick={this.props.logOut}><i className="material-icons">logout</i>LOGOUT</a></li>
          </ul>
       
          <div id='friendship' className='dropdown-content' style={{paddingRight:"15px",paddingLeft:"15px"}}>
            <RequestList 
            list = {incoming}
            header={"Gelen İstekler"} 
            method={requestFriends} 
            icon="add"
            my={my}
           />
   
            
            <RequestList 
            list = {outgoing}
            header={"Giden İstekler"} 
            method={cancelFriends} 
            icon="close"
            my={my}
          />
          </div>
          
        </ul>
        
    
  )}
}



const mapStateToProps = state => {
  let uid =state.firebase.auth.uid;
  let friends = state.firestore.ordered.myFriends
  let my=state.firestore.data.profile;
      my=[uid,my];
  return{
  my ,
  friends,
  uid,
  myMail : state.firestore.ordered.myMail

}};

const mapDispatchToProps = dispatch => ({
  logOut : () => dispatch(logOut()),
  setProfile : () => dispatch(setProfile()),
  requestFriends : (my,friend) => dispatch(requestFriends(my,friend)),
  cancelFriends : (my,friend) => dispatch(cancelFriends(my,friend)),
  getWall : (uid,myFriends)=>dispatch(getWall(uid,myFriends))
});
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(props=>{
    const {uid} = props
    return [ {collection:"friends",doc:uid,storeAs: 'myFriends'}]
  }
   
  )
  )(LoginLinks); 