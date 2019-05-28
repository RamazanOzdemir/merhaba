import React from 'react'
import {Link} from "react-router-dom"

function ListMyFriends(props) {
    const{myFriends} = props;
  return (
    <div>
        <ul className="collection with-header">          
            <li className="collection-header"><h6>Arkadaslarım : </h6></li>
            { myFriends?
              myFriends.map(friend=>(
              friend?
              <li className="collection-item" key={friend[0]+"list-item"}>
                  <Link to={`/friendPage/${friend[0]}`}>{friend[1].firstName+" "+friend[1].lastName}</Link>
              </li>
              : <li className="collection-item">Sonuç Bulunamadı !!! </li> 
              ))
              :<li className="collection-item">Sonuç Bulunamadı !!! </li>  
            }
        </ul>
    </div>
  )
}

export default ListMyFriends;
