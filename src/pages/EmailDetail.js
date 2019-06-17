import React,{Component} from "react"
import {connect} from "react-redux"
import {sendMail} from "../store/actions"

class EmailDetail extends Component {
    state ={
        messageText:""
    }

    handleChange = (e)=>{
        e.persist();
        this.setState(()=>({
            messageText:e.target.value
        }))
        
    }
    send = (mail)=>{
        mail=mail?mail:[]
        const {sendMail,uid} = this.props;
        const {to} = this.props.match.params
        
        const {messageText} = this.state;
        const myNewMail=[{who:uid,message:messageText,isRead:true,when:Date.now()}];
        const itsNewMail=[{who:uid,message:messageText,isRead:false,when:Date.now()}];
        const myMessage = mail.concat(myNewMail)
        const itsMessage = mail.concat(itsNewMail)
        
        sendMail(uid,to,myMessage,itsMessage);
        this.setState(()=>({messageText:""}))
    }
    componentDidCatch= ()=>{

    }
    xx = ()=>{
        const element = document.getElementById("DivID");
   
        if(element){
        element.scrollTop = element.scrollHeight;
        const x=element.scrollHeight;
        element.scrollTo(
          0,x);
        }
    }
    componentWillUnmount =()=>{
        const {uid,myMail,sendMail} = this.props;
        const {to} = this.props.match.params;
        let mail = myMail?Object.entries(myMail[0]?myMail[0]:{}):[];          
            mail = mail.filter(element=> element[0] ===to)
            mail = mail[0]?mail[0][1]:[];
        const itsMail=mail;   
        const readeMail = mail.map(message=>{
            return{...message,isRead:true}});
            console.log(readeMail)
            console.log(itsMail)
        sendMail(uid,to,readeMail,itsMail);
    }
    render(){
    const {uid,myMail} = this.props;
    const {to} = this.props.match.params
      let mail = myMail?Object.entries(myMail[0]?myMail[0]:{}):[];
      //let mail= myMail?myMail:[];
      
        mail = mail.filter(element=> element[0] ===to)
        
        mail = mail[0]?mail[0][1]:[];
    const {messageText} = this.state;
  
    
    return (
        <div className="container">
            <div className="row" style={{border:"2px grey solid" }}>
                <div  id="DivID"  style={{height:"60vh",backgroundColor:"pink",overflow:"auto"}}>
                    {
                        
                        mail?mail.map(message=>{
                            return(
                            <div  className="row" key={message.when+""+message.who}>
                            <div className={uid===message.who?"col s5 right":"col s5"} style={{backgroundColor:uid===message.who?"green":"grey"}}>
                                <pre  className="white-text">{message.message}</pre>
                            </div>
                            </div>
                            )
                        })
                        :<p>Loading...</p>
                        
                    }
                </div>
                <div className="input-field valign-wrapper">
                    <textarea value={messageText} className="col s10 materialize-textarea validate" onChange={this.handleChange} />
                    <a href="#/" onClick={this.send.bind(this,mail)} className="col s1 "><i className="material-icons">send</i></a>
                </div>
            </div>
            
        </div>
    )}
}
const mapStateToProps = state =>{
    return {
    uid : state.firebase.auth.uid,
    myMail : state.firestore.ordered.myMail

}};
const mapDispatchToProps = dispatch =>({
    sendMail : (from,to,message,message2)=>dispatch(sendMail(from,to,message,message2))
});
export default connect(mapStateToProps,mapDispatchToProps)(EmailDetail);
