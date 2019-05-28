import React, { Component } from 'react'
import "materialize-css";
import {connect} from "react-redux";
import {checkUser,sendVerifedLink} from "../store/actions"
import {Redirect} from "react-router-dom"
class Login extends Component {
  state = {
    email : "",
    password : "",
    emailVerified : null
  }
  handleChange = e =>{
    this.setState({
      [e.target.id] : e.target.value
    });
      
  }
  handleSubmit = e => {
    e.preventDefault();
    const {email,password} = this.state;
    //const {auth} = this.props;
   // const isLogin=!auth.isEmpty,
        // isVerified =auth.emailVerified;
    this.props.checkUser(email,password);

    //this.setState({emailVerified : isLogin});
    
  }
  
  render() {
    const {loginError,sendVerifedLink,auth} = this.props;
    const {emailVerified} = this.state;
    if(!auth.isEmpty) return <Redirect to="/" />
    else
    return (
      <div className="container">
        <div className ="row">
        
            <form className="white col s12 " style={{marginTop:"5em"}}>
                <h3 className="center">GİRİŞ</h3>
                {
                loginError !== null ?
                <div className="red ligthen-3 white-text center">
                  <p>{loginError}</p>
                </div>
                :
                null
              }
                <div className="input-field col s10 l6 offset-l3 offset-s1 ">
                    <i className="material-icons prefix">email</i>
                    <label  htmlFor="email ">Kullanıcı Email'i</label>
                    <input type="email" id="email" className="validate" onChange={this.handleChange}/>
                    
                </div>
                <div className="input-field col s10 l6 offset-l3 offset-s1">
                    <i className="material-icons prefix">create</i>
                    <label  htmlFor="password ">Kullanıcı Şifresi</label>
                    <input type="password" id="password" className="validate" onChange={this.handleChange} />
                    
                </div>
                <div className="input-field center col s12 ">
                    <button className="btn waves-effect waves-light"onClick={this.handleSubmit} >GİRİŞ</button>
                </div>
                {
                  emailVerified?
                  <div className="col s12 l12">
                    <div className="red ligthen-3 white-text center">
                      <p>Emailinize gönderdiğimiz linki onaylamanız gerekmektedir. </p>
                      <p>Yeniden onay linki yollamak için aşağıdaki butona basınız.</p>
                    </div>
                    <div className="input-field center col s12 ">
                      <button className="btn waves-effect waves-light"onClick={sendVerifedLink} >GÖNDER</button>
                    </div></div>
                  : null
                }
            </form>

        </div>
        
      </div>
    )
  }
}
const mapStateToProps = state =>({
  loginError : state.login.loginError,
  auth : state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  checkUser : (email,password)=>dispatch(checkUser(email,password)),
  sendVerifedLink : ()=>dispatch(sendVerifedLink())
});
export default connect(mapStateToProps,mapDispatchToProps)(Login);
