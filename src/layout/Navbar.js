import React from 'react'
import {Link} from "react-router-dom"
import LogoutLinks from './LogoutLinks';
import LoginLinks from './LoginLinks';
import {connect} from "react-redux"
const Navbar = props=>  {
  const { auth,avatar } = props;

  const isLogin=!auth.isEmpty,
  //isVerified =auth.emailVerified,
  //emailVerified = isLogin&&isVerified;
  emailVerified = isLogin;
  const links = emailVerified?<LoginLinks avatar={avatar}/>:<LogoutLinks/>,
        side =emailVerified?<a href="#/" data-target="slide-out" className="left sidenav-trigger" style={{marginLeft:"0px"}}><i className="material-icons">menu</i></a>:null;

  return (
   <div className="navbar-fixed">
    <nav className="nav-wrapper green accent-3">
      <div className="container">
       <Link to ="/home"className="left brand-logo" style={{marginLeft:"45px"}}><img src="img/merhaba.png" alt="M"style={{height:"7vh",width:"40px",marginTop:"10px"}}/></Link>
        {side}   
        {links}
      </div>
    </nav>
   </div> 
  )
}


const mapStateToProps = state =>({
  auth : state.firebase.auth,
  profile : state.firestore.data.profile
});
export default connect(mapStateToProps)(Navbar);
