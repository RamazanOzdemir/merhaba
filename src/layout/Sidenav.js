import React,{Component} from 'react'
import M from "materialize-css";
import {NavLink} from "react-router-dom";

class Sidenav extends Component  {
 
 componentDidMount = ()=>{
   
   var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
          

 }
 render(){
   const {name,email,avatar} = this.props;
  return (
    <div >
      <ul id="slide-out" className="sidenav" style={{width:"80%"}}>
    <li><div className="user-view">
      <div className="background green accent-3">
      
      </div>
      <a href="#/" className="btn btn-floating btn-large  lighten-3">{avatar}</a>
      <a href="#name"><span className="white-text name handWrite">{name}</span></a>
      <a href="#email"><span className="white-text email">{email}</span></a>
    </div></li>
    <li><NavLink to="/home"><p className="handWrite">Ana Sayfa</p></NavLink></li>
    <li><NavLink to="/"><p className="handWrite">Benim Sayfam</p></NavLink></li>
    <li><NavLink to="/uploadImg"><p className="handWrite">Resimlerim</p></NavLink></li>
    <li><NavLink to="/myFriends"><p className="handWrite">Arkadaşlarım</p></NavLink></li>
  </ul>
    </div>
  )
 }
}

export default Sidenav
