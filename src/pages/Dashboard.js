import React, { Component } from 'react';
import ImageCard from "../layout/ImageCard";
import SearchBar from '../layout/SearchBar';
import {connect} from "react-redux"
import {getWall} from "../store/actions"
import {Redirect} from "react-router-dom"
class Dashboard extends Component {
 componentDidMount= () =>{
    const {uid,getWall,myFriends} = this.props;
    let friends = Object.entries(myFriends?myFriends:{});
    friends = friends.filter(friend=>friend[1].friend==="OK")
      getWall(uid,friends)
 }
 componentWillReceiveProps = (newProps)=>{
    const {uid,getWall} = this.props;
    if(newProps.myFriends !== this.props.myFriends){
      let {myFriends} = newProps;
      let friends = Object.entries(myFriends?myFriends:{})
      friends = friends.filter(friend=>friend[1].friend==="OK")
      getWall(uid,friends);
  } 
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
const mapStateToProps = state => {
  return {
  myFriends : state.firestore.data.myFriends,
  uid : state.firebase.auth.uid,
  wall : state.wall.myWall
}};
const mapDispatchToProps = dispatch => ({
  getWall : (uid,myFriends)=>dispatch(getWall(uid,myFriends))
});
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
