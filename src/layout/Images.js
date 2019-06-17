import React,{Component} from 'react';
import M from "materialize-css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteImage,setMyWall} from "../store/actions"
class Images extends Component {

  componentDidMount = () =>{
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
  }

  delete =(image)=>{
    const { deleteImage,auth } = this.props
    deleteImage(auth.uid,image[0]);
  }

  share = (image) => {
    const {profile,auth,setMyWall} = this.props;
    const name = profile.firstName+" "+profile.lastName;
    const likeCount = [];
    const createdDate =Date.now(); 
    const shareItem ={
      [image[0]]:{name:name,url:image[1],likeCount:likeCount,createdDate:createdDate,uid:auth.uid}
      };
    setMyWall(auth.uid,shareItem);
  }

  render(){
    const {image} = this.props;

  return (
  
      
          
      <div className="card"  >
        <div className="card-image" style={{overflow:"hidden"}} >          
          <img src={image[1]} alt={image[0]}               
           className="responsive-img materialboxed"
           />
        </div>
        <div className="card-action"style={{display:"flex",justifyContent: "space-between"}} >
          <Link to="/" className="btn" onClick={this.share.bind(this,image)} ><i className="material-icons">share</i></Link>
          <button className="btn" onClick={this.delete.bind(this,image)}><i className="material-icons">delete</i></button>
        </div>
      </div>
        
      

  )}
}
const mapStateToProps = state => ({
  auth : state.firebase.auth,
  profile : state.firestore.data.profile,
});
const mapDispatchToProps = dispatch =>({
  deleteImage : (uid,image) => dispatch(deleteImage(uid,image)),
  setMyWall : (uid,share) => dispatch(setMyWall(uid,share))
});
export default connect(mapStateToProps,mapDispatchToProps)(Images);
