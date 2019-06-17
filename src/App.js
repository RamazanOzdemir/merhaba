import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Navbar from './layout/Navbar';
import Sidenav from './layout/Sidenav';
//import Carusel from "./components/Carusel";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import NotFound from './components/NotFound';
import Dashboard from './pages/Dashboard';
import SetProfile from './pages/SetProfile';
import MyPage from './pages/MyPage';
import UploadImg from './pages/UploadImg';
import FriendPage from "./friend/FriendPage"
import SearchPage from './pages/SearchPage';
import EmailPage from './pages/EmailPage';
import MyFriends from './friend/MyFriends';
import EmailDetail from './pages/EmailDetail';
class App extends Component {


  render() {
    const {auth,profile} = this.props;
    const name = profile.firstName + " " + profile.lastName;
    const avatar = profile.firstName.charAt(0) + "" +profile.lastName.charAt(0);
    const email = auth.email;
    return (
       <BrowserRouter>
      <div>
        <Navbar avatar={avatar}/>
        <Sidenav name={name} avatar ={avatar} email={email}/>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/setProfile" component={SetProfile} />
          <Route exact path="/" component={MyPage} />
          <Route exact path="/myFriends" component={MyFriends} />
          <Route exact path="/friendPage/:uid" component={FriendPage} />
          <Route exact path="/searchPage/:search" component={SearchPage} />
          <Route exact path="/uploadImg" component={UploadImg} />
          <Route exact path="/emails" component={EmailPage} />
          <Route exact path="/emailDetail/:to" component={EmailDetail}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}
const mapStateToProps = state =>({
  auth : state.firebase.auth,
  profile : state.firestore.data.profile?state.firestore.data.profile:{firstName:" ",lastName:" "}
});
export default  compose (
  connect(mapStateToProps),
  firestoreConnect(props=>{
      const {auth} = props;
      if(auth.isEmpty)
      return[]
      else
      return[{collection:"profiles",doc:auth.uid,storeAs:"profile" },
             {collection:"friends",doc:auth.uid,storeAs: 'myFriends'},
             {collection:"email",doc:auth.uid,storeAs: 'myMail',
              }]
  })
  )(App);
