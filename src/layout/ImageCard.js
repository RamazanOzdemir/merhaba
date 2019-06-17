import React,{Component} from 'react';
import M from "materialize-css";
import {connect} from "react-redux";
import {addLike,deleteShare,getProfile} from "../store/actions";

class ImageCard extends Component {
  
  like = (item) =>{
      let {likeCount,uid} = item[1];
      const {auth,profile,addLike} = this.props;
      const isLike = likeCount.filter(like=>like.uid===auth.uid);
      if(isLike.length === 0){
      const newLike = {name:profile.firstName+" "+profile.lastName,uid:auth.uid};
      likeCount = [...likeCount,newLike];
      const newLikeCount = {...item[1],likeCount}
      const update={[item[0]]:newLikeCount};
      
      addLike(uid,update);
      }
  };

  delete = (image) =>{
      const {auth,deleteShare} = this.props;
      deleteShare(auth.uid,image);
     
  };

  componentDidMount = ()=>{
    const elems = document.querySelectorAll('.materialboxed');
     M.Materialbox.init(elems);
     const {getProfile,auth} = this.props;
     getProfile(auth.uid);
  };

  render(){
    const {item,isMy} = this.props;

    const {name,createdDate,url,likeCount} = item[1];
    const date = new Date(createdDate);
    const shareDate = date.getDate()+" / "+(date.getMonth()+1)+" / "+date.getFullYear();
  return (

     <div className="card" >
      <div className="card-header">
        <div className="container" style={{height:"10px"}}>
          <div className="row">
            <div className="col s12 m6" > <p>{name}</p> </div>
            <div className="col s12 m6" > <p>Paylaşım tarihi : {shareDate}</p> </div>
          </div>
        </div>
        </div>
        
      <div className="card-image">
       <img src={url} alt={name} className="responsive-img materialboxed"/>
       <span className="card-title">Card Title</span>
       <button  className="btn-floating halfway-fab waves-effect waves-light red pulse"
       onClick={this.like.bind(this,item)} style={{marginRight:"80px"}} >
       <i className="material-icons" >favorite</i></button>
       <button className="btn-floating halfway-fab waves-effect waves-light red " 
       style={{marginRight:"40px"}}>
         <span className=" badge red white-text activator">{likeCount.length}</span></button>
       {isMy? 
        <button  className="btn-floating halfway-fab  waves-effect waves-light grey"
        onClick={this.delete.bind(this,item[0])} >
        <i className="material-icons">close</i></button>
        :null
        }
       
      </div>
      <div className="card-content">
        <p className="handWrite">Herşey bir MERHABA ile başlar</p>
      
      </div>
      <div className="card-reveal  " style={{backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
      <span className="card-title white-text text-lighten-4 " style={{marginTop:"50px",marginBottom:"50px"}}>
        Beğenen Kişiler : <i className="material-icons right">close</i></span>
          {
        
            likeCount.map(like=>(
              
              <p className="white-text text-lighten-2" key={like.uid+"like"}>{like.name}</p>
            ))
          }
          
    </div>
   </div>
  )}
}

const mapStateToProps = state =>({
  auth : state.firebase.auth,
  profile : state.firestore.data.profile?state.firestore.data.profile:{firstName:" ",lastName:" "}
});
const mapDispatchToProps = dispatch =>({
  addLike : (uid,newLikeCount) => dispatch(addLike(uid,newLikeCount)),
  deleteShare : (uid,image) => dispatch(deleteShare(uid,image)),
  getProfile : uid => dispatch(getProfile(uid))
});
export default connect(mapStateToProps,mapDispatchToProps)(ImageCard);