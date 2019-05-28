import React, { Component } from 'react';
import "materialize-css";
import M from "materialize-css";
import {connect} from "react-redux";
import {signupUser} from "../store/actions"
import {Redirect} from "react-router-dom"
class Signup extends Component {
  state = {
    email : "",
    password1 : "",
    password2 : "",
    first_name : "",
    last_name : "",
    signUpError : ""
  }
  handleChange = e =>{
    this.setState({
      [e.target.id] : e.target.value
    });
      
  }

  signup = (e) =>{
    const {email,password1,first_name,last_name} = this.state
    const profile ={firstName : first_name,
                    lastName : last_name,
                    birthday : "",
                    job : "",
                    country : "",
                    relationship : "",
                    gender : ""}
      this.props.signupUser(email,password1,profile);
      this.setState(()=>({sign:false})) 
     

  }      

  handleSubmit = (e)=>{
    e.preventDefault();
    const {email,password1,password2,first_name,last_name} = this.state ;
    const ctrlName = first_name ==="";
    const ctrlSurname = last_name ==="";
    const ctrlEmail = email.includes("@") && email.includes(".",email.indexOf("@"));
    const ctrlPassword = password1.includes("&")||password1.includes("|")||password1.includes("/")||
    password1.includes("=")||password1.includes("[")||password1.includes("]")||password1.length<6;
    if(ctrlName)
    this.setState({signUpError:"Ad bölümü boş bırakılamaz."}); 
    else if(ctrlSurname)
    this.setState({signUpError:"Soyad bölümü boş bırakılamaz."}); 
    else if(!ctrlEmail)
      this.setState({signUpError:"Lütfen geçerli bir Email girin."}); 
    else if(ctrlPassword)
      this.setState(()=>({signUpError:"Şifreniz 6 karakterden fazla olmaıdır ve '&' - '/' - '[' - ']' - '=' gibi karakterler içermemelidir. Lütfen şifrenizi tekrar oluşturunuz !"}));
    else if(password1 !== password2)
      this.setState(()=>({signUpError:"Şifre tekrarı yanlış oldu! Lütfen şifrenizi kontrol ediniz."}));
    else {
      this.signup()
      this.setState(()=>({signUpError:""}));
    }
    
}
 componentDidMount = ()=>{
   
        M.updateTextFields();
 }
  render() {
    const {signError,auth} = this.props;
    const {signUpError} = this.state;
    if(!auth.isEmpty) return <Redirect to="/" />
    else
    return (
      <div className="container" style={{marginTop:"5em"}}>
        <div className="row">
          <form  className="col s12" onSubmit={this.handleSubmit}> 
          <h3 className="center">KAYIT</h3>
            <div className="row" >
              {
                signUpError !=="" || signError !== null ?
                <div className="red ligthen-3 white-text center">
                  <p>{signUpError !== ""?signUpError:signError}</p>
                </div>
                :
                null
              }
                
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">account_circle</i>
                    <label className="active" htmlFor="first_name">Adınız</label>
                    <input type="text" id="first_name" className="validate" onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">account_circle</i>
                    <label className="active" htmlFor="last_name ">Soyadınız</label>
                    <input type="text" id="last_name" className="validate" onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l10 ">
                    <i className="material-icons prefix">email</i>
                    <label className="active" htmlFor="email ">Email</label>
                    <input type="email" id="email" className="validate" onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">password</i>
                    <label htmlFor="password1 ">Şifre</label>
                    <input type="password" id="password1" className="validate" onChange={this.handleChange} />
                    <span className="helper-text">Şifreniz minimum 6 karakter olmalıdır.</span>
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">password</i>
                    <label htmlFor="password2 ">Şifre Tekrarı</label>
                    <input type="password" id="password2" className="validate" onChange={this.handleChange} />
                    <span className="helper-text">Şifreniz minimum 6 karakter olmalıdır.</span>
                </div>
                <div className="input-field center col s12  ">
                    <button type="submit"  className="waves-effect waves-light btn" >KAYIT OL</button>
                </div>
            </div>
            
          </form>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state =>({
  signError : state.signup.signupError,
  auth : state.firebase.auth
});

const mapDispatchToProps = dispatch =>({
  signupUser : (email,password,profile) => dispatch(signupUser(email,password,profile))
});
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
