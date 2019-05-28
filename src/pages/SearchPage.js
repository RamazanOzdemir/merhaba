import React from 'react'
import {connect} from "react-redux"
import {compose} from "redux"
import {firestoreConnect} from "react-redux-firebase"
import ListOthers from '../layout/ListOthers';
import ListMyFriends from '../layout/ListMyFriends';
import {Redirect} from "react-router-dom";
const seraching = (auth,users,friends,search)=>{
  if(users&&search){
  let result = [],result2 =[];
  const searchWords = search.toLowerCase().split(" ");
  let arrayUser = Object.entries(users);
  let my = arrayUser.filter(my=>my[0] === auth.uid)[0];
  
  
  if(friends){
    let myFriends = Object.entries(friends);

    arrayUser = arrayUser.filter(user =>myFriends.filter(friend=>friend[0]===user[0]&&friend[1].friend==="OK").length ===0 );
    
    result2=myFriends.filter(friend=>{
      let x = (friend[1].firstName+""+friend[1].lastName).toLocaleLowerCase();
      let y = searchWords.filter(word=>x.includes(word));
  
      if(y.length&&friend[1].friend==="OK") return friend;
      else return null;
    })
  }
  const result1=arrayUser.filter(user=>{
    let x = (user[1].firstName + "" + user[1].lastName).toLocaleLowerCase();
    let y = searchWords.filter(word=>x.includes(word));

    if(y.length) return user;
    else return null;
  })
  result=[result1,result2,my];
  return result;
} return [[],[],[]];
}
function SearchPage(props) {
    const {users,friends,auth} = props;
    const {search}=props.match.params
    const result = seraching(auth,users,friends,search);
    const isFirstFriend = result[1].length===0?true:false;
    if(auth.isEmpty) return <Redirect to="/login"/>
    else
  return (
    <div className="container">
      <h4>Arama Sonucu : </h4>
        <ListMyFriends myFriends={result[1]}/>
        <ListOthers users={result[0]} my={result[2]} isFirst={isFirstFriend}/> 
     
          

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
