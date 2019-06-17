import React, { Component } from 'react';
import {connect} from "react-redux";
import {setImages,getImages} from "../store/actions";
import {Redirect} from "react-router-dom";
import  M from "materialize-css";
import Images from '../layout/Images';


class UploadImg extends Component {
    state = {
        files : []
    }
 handleChange = e =>{
    this.setState({files :[...e.target.files]})
     
 }

 handleSubmit = e =>{
    e.preventDefault();
    const {auth,setImages} = this.props;
    const {files} = this.state;
    setImages(auth.uid,files)
    this.setState(()=>({
        files:[]
    }))
 }

 componentDidMount = () =>{
    const {auth,getImages} = this.props;
    getImages(auth.uid);
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
 }
 
  render() {
    const {images,percentage,auth} = this.props;
    const {files} = this.state;
    if(auth.isEmpty) return <Redirect to="/login"/>
    else
    return (
      <div className="row ">
        <form className="col s12 "  >
          <div className="row " >
            <div className="file-field input-field col s10 m5 offset-m3 offset-s1" >
              
                <div className="btn">
                    <span>File</span>
                    <input type="file" multiple onChange={this.handleChange}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
            </div>
            {
                files.length>0?
                <div className="input-field col m1 s10 offset-s1 center">
                    <button className="btn "  onClick={this.handleSubmit}><span>YÜKLE</span></button>
                 </div>
                 :null
            }
           <div className="progress col s12 m12">
                <div className="determinate" style={{width:`${percentage}%`}}></div>
            </div>
          </div>
        </form>
        <div className="container">
        <div className="row">
        {

            images.map(image => (
                <div className="col s10  m4 offset-s1" key={image[0]}> 
                   <Images image={image} />
                </div>
                )
            )
        }
        </div>
        </div>    
      </div>
    )
  }
}
const mapStateToProps = state =>({
    auth : state.firebase.auth,
    images : state.images.images,
    percentage : state.images.percentage,
});
const mapDispatchToProps = dispatch =>({
    setImages : (uid,file) => dispatch(setImages(uid,file)),
    getImages : uid => dispatch(getImages(uid)),
});
export default connect(mapStateToProps,mapDispatchToProps)(UploadImg);
