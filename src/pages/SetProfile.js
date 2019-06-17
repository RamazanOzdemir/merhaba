import React, { Component } from 'react';
import "materialize-css";
import M from "materialize-css";
import {connect} from "react-redux";
import {setProfile} from "../store/actions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Redirect} from "react-router-dom"
class SetProfile extends Component {
    state={
        firstName : " ",
        lastName : " ",
        birthday : " ",
        job : " ",
        country : " ",
        relationship : " ",
        gender : " ",
        
    }
    handleChange = (e) =>{
        this.setState({
          [e.target.id] : e.target.value
        });
          
      }
    setBirthday = () => {
        
        const {ins} = this.state;
        this.setState({birthday:ins[0].date});
        console.log(ins[0].Datepicker);
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const {uid,setProfile} = this.props;
        setProfile(uid,this.state);
        this.props.history.push("/")
      
    }
    componentWillMount = ()=>{
        const {profile} = this.props;
        if(profile)
        this.setState(()=>({
            firstName : profile.firstName,
            lastName : profile.lastName,
            birthday : profile.birthday,
            job : profile.job,
            country : profile.country,
            relationship : profile.relationship,
            gender : profile.gender,
        }));
    }
    componentWillReceiveProps = (newProps)=>{
        
        if(this.props.profile!==newProps.profile){
            const {profile} = newProps;
            this.setState(()=>({
                firstName : profile.firstName,
                lastName : profile.lastName,
                birthday : profile.birthday,
                job : profile.job,
                country : profile.country,
                relationship : profile.relationship,
                gender : profile.gender,
            }));
            M.updateTextFields();
            
        }
        
     }
    componentDidMount = () =>{
        M.updateTextFields();
       
        const elems = document.querySelectorAll('.datepicker');
        const i18n = {months : ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz"
        ,"Ağustos","Eylül","Ekim","Kasım","Aralık"],weekdaysAbbrev:["P","P","S","Ç","P","C","C"]};
        M.Datepicker.init(elems, {i18n,format:"mmmm dd,yyyy",firstDay:1,disableWeekends:true});
        
        
        
        
    }
  render() {
    const {firstName,lastName,birthday,job,relationship,gender,country} = this.state;
    const {uid} = this.props;
    if(!uid) 
    return <Redirect to="/login"/>
    else
    return (
 <div className="row">
          <form  className="col s12" onSubmit={this.handleSubmit}> 
          <h3 className="center">PROFİL BİLGİLERİNİ DÜZENLE</h3>
            <div className="row" >
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label  htmlFor="firstName">Adınız</label>
                    <input type="text" id="firstName" className="validate" value={firstName} onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label className="active" htmlFor="lastName ">Soyadınız</label>
                    <input type="text" id="lastName" className="validate" value={lastName} onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label className="active" htmlFor="birthday ">Doğum tarihi</label>
                    <input type="text" id="birthday" className="validate" value={birthday} onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label htmlFor="job ">Mesleğiniz</label>
                    <input type="text" id="job" className="validate" value={job} onChange={this.handleChange} />
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label htmlFor="country ">Memleketiniz</label>
                    <input type="text" id="country" className="validate" value ={country} onChange={this.handleChange} />   
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label htmlFor="relationship ">İlişki Durumu</label>
                    <input type="text" id="relationship" className="validate" value={relationship} onChange={this.handleChange} />   
                </div>
                <div className="input-field col s10 l6 ">
                    <i className="material-icons prefix">create</i>
                    <label htmlFor="gender ">Cinsiyetiniz</label>
                    <input type="text" id="gender" className="validate" value={gender} onChange={this.handleChange} />   
                </div>
                <div className="input-field center col s12  ">
                    <button type="submit"  className="waves-effect waves-light btn" >PROFİLİNİ GÜNCELLE</button>
                </div>
            </div>
            
          </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    uid : state.firebase.auth.uid,
    profile : state.firestore.data.profile
});

const mapDispatchToProps = dispatch => ({
    setProfile : (uid,profile) => dispatch(setProfile(uid,profile)),
});
export default compose (
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props=>{
        const {uid} = props;
        return[{collection:"profiles",storeAs:"profile" ,doc:uid}]
    })
    )(SetProfile);
