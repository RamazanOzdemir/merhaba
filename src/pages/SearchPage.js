import React from 'react'
import {connect} from "react-redux"
import {compose} from "redux"
import {firestoreConnect} from "react-redux-firebase"
import ListOthers from '../layout/ListOthers';
import ListMyFriends from '../layout/ListMyFriends';
import {Redirect} from "react-router-dom";
import SearchBar from "../layout/SearchBar"
const seraching = (auth,users,friends,search)=>{
  if(users&&search){
  let result = [],result2 =[];
  const searchWords = search.toLowerCase().split(" ");
  let arrayUser = Object.entries(users);
  let my = arrayUser.filter(my=>my[0] === auth.uid)[0];
  
  let result1=arrayUser.filter(user=>{
    let x = (user[1].firstName + "" + user[1].lastName).toLocaleLowerCase();
    let y = searchWords.filter(word=>x.includes(word));

    if(y.length) return user;
    else return null;
  })
  if(friends){
    let myFriends = Object.entries(friends);    
    result2=result1.filter(element=>myFriends.some(friend=>friend[0]===element[0]&&friend[1].friend==="OK"))
    result1=result1.filter(element=>result2.every(friend=>friend[0]!==element[0]))
  }
 
  result=[result1,result2,my];
  return result;
} return [[],[],[]];
}
function SearchPage(props) {
    const {users,friends,auth} = props;
    const {search}=props.match.params
    const result = seraching(auth,users,friends,search);
    if(auth.isEmpty) return <Redirect to="/login"/>
    else
  return (
    <div className="container">
      <div className="row">
        
        <div className="col s10  offset-s1">
        <h4>Arama Sonucu : </h4>
          <SearchBar history={props.history}/>
        </div>
        <div className="col s10 offset-s1">
          <ListMyFriends myFriends={result[1]}/>
          <ListOthers users={result[0]} my={result[2]} /> 
        </div>
      </div>    

    </div>    
    
  )
}
const mapStateToProps = state => {
    return{
    auth : state.firebase.auth,
    users : state.firestore.data.profiles,
    friends : state.firestore.data.myFriends
}};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection : "profiles"}
    ])
    )(SearchPage);
