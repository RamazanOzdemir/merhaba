import React, { Component } from 'react'
import M from "materialize-css"
import {Link,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {sendMail} from "../store/actions"
class EmailPage extends Component {
    componentDidMount = ()=>{
        const elems = document.querySelectorAll('.tabs');
        M.Tabs.init(elems);
    }    
    mesaggeDate = (createdDate)=>{
        if(!createdDate)
        return null
        const date = new Date(createdDate);
        let mnt = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()
        const shareDate = date.getDate()+" / "+(date.getMonth()+1)+" / "+date.getFullYear()+"  "+date.getHours()+":"+mnt;
        return shareDate;
    }
    isRead = (message)=>{
        const {auth} =this.props;
        
        if (message.who!==auth.uid&&!message.isRead&&message.who)
        return "bold";
        else
        return "normal";
    }
    readMessage = (to,messages) =>{
        const {auth,sendMail} = this.props
        if(messages.length){
            messages.forEach(message=>message.isRead=true)
            console.log(messages)
            sendMail(auth.uid,to,messages);
        }
    }
    render() {
        const {friends,auth,friendsProfiles,myMail} = this.props;
        let myFriendsProfiles = friendsProfiles?Object.entries(friendsProfiles):[];
        let myFriends = friends?Object.entries(friends):[];
        myFriends = myFriends.filter(friend=>friend[1].friend==="OK")
        myFriends = myFriendsProfiles.filter(element=>myFriends.some(friend=>friend[0]===element[0]))
       // let mail = myMail?Object.entries(myMail[0]):[];
       // let mail = myMail?Object.entries(myMail[0]):[];
       // let mail= myMail?myMail:[];
       let mail = myMail?Object.entries(myMail[0]?myMail[0]:{}):[];        
        if(auth.isEmpty) return <Redirect to="/login"/>
        else
        return (
            <div className="container">
                <div className="row">
                    
                    <div id="incoming">
                        <ul className="collection" >
                            {myFriends.length?
                                myFriends.map(friend=>{
                                    const avatar = friend[1].firstName.charAt(0) + "" +friend[1].lastName.charAt(0);
                                    let our = mail.filter(element=> element[0] ===friend[0])
                                    let ourMessage = our[0]?our[0][1]:[];
                                    let lastMessage={};
                                    if(ourMessage.length)
                                     lastMessage=ourMessage[ourMessage.length-1]                                      
                                    
                                    const style = {fontWeight:this.isRead(lastMessage)};
                                    return(
                                        <li className="collection-item avatar" key={friend[0]+"messageList"}>
                                         <Link to={`/emailDetail/${friend[0]}`}  className="btn btn-floating lighten-3 circle">{avatar}</Link>
                                         <p  style={style} className="title">{friend[1].firstName+" "+friend[1].lastName}</p>
                                         <p style={style}>{this.mesaggeDate(lastMessage.when)}</p>
                                         <p style={style} className="truncate">{lastMessage?lastMessage.message:null}</p>
                                        </li>
                                    )
                                })   
                                :<p>Yükleniyor...</p>}

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.firebase.auth,
    friends : state.firestore.data.myFriends,
    friendsProfiles : state.firestore.data.profiles,
    myMail : state.firestore.ordered.myMail

});
const mapDispatchToProps = dispatch => ({
    sendMail : (from,to,message)=>dispatch(sendMail(from,to,message))
});
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
firestoreConnect(props=>{
    return [
             {collection : "profiles"}]
  })
)(EmailPage);
