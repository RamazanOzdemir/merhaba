import React from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {requestFriends} from "../store/actions"

const add = (user,requestFriends,my) =>{
  
  const friend = {uid:user[0],firstName:user[1].firstName,lastName:user[1].lastName}
  requestFriends(my,friend,"request");
}
function ListOthers(props) {
    const {users,requestFriends,my} = props;
  return (
    <div>
    <ul className="collection with-header">        
        <li className="collection-header"><h6>Diğerleri : </h6></li>  
        {
            users ?
            users.map(user=>(
            user?
            <li className="collection-item" key={user[0]+"list-item"}>
              <div>
                <Link to={`/friendPage/${user[0]}`}>{user[1].firstName+" "+user[1].lastName}</Link>
                <a href="#/" onClick={add.bind(this,user,requestFriends,my)} className="secondary-content"><i className="material-icons">person_add</i></a>
              </div>
            </li>
            : <li className="collection-item">Sonuç Bulunamadı !!! </li> 
            ))
            :<li className="collection-item">Sonuç Bulunamadı !!! </li> 
        }
    </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch =>({
  requestFriends : (uid,friend,status) => dispatch(requestFriends(uid,friend,status))
})
export default connect(null,mapDispatchToProps)(ListOthers);
