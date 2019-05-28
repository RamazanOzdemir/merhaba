import React, { Component } from 'react';
import ImageCard from "../layout/ImageCard";
import SearchBar from '../layout/SearchBar';
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {getWall} from "../store/actions"
import {Redirect} from "react-router-dom"
class Dashboard extends Component {
  componentDidMount= () =>{
   const {uid,myFriends,getWall} = this.props;
   let friends = Object.entries(myFriends?myFriends:{})
   friends = friends.filter(friend=>friend[1].friend==="OK")
     getWall(uid,friends)
  }
  render() {
   const {wall,uid} = this.props;
   let mainWall = wall?wall.sort((a,b)=>b[1].createdDate-a[1].createdDate):null;

   if(!uid) return <Redirect to="/login"/>
   else
    return (
      <div className="container">
        <div className="row">
          <div className="col s10 l8 offset-l2 offset-s1">
            <SearchBar history={this.props.history}/>
          </div>
            {
            mainWall?
            
            <div className="col s12" >
                  {
                    mainWall.map(item=>(
                      <ImageCard
                        key ={item[1].uid+item[0]+"mainPage"}
                        item={item}
                        isMy = {false}
                       
                       />
                
                    ))
                  }
                
              
            </div>
            :null
                }
          
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  myFriends : state.firestore.data.myFriends,
  uid : state.firebase.auth.uid,
  wall : state.wall.myWall
});
const mapDispatchToProps = dispatch => ({
  getWall : (uid,myFriends)=>dispatch(getWall(uid,myFriends))
});
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(props=>{
    const {uid} = props
    return [ {collection:"friends",doc:uid,storeAs: 'myFriends'}]
  }
   
  )
  )(Dashboard);
