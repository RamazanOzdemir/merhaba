import React from 'react'
import {NavLink} from "react-router-dom";
function LogoutLinks() {
  return (
         <ul className="right ">
          <li className="handWrite"><NavLink to="/login">Login</NavLink></li>
          <li className="handWrite"><NavLink to="/signup">Signup</NavLink></li>
          
        </ul>
    
  )
}

export default LogoutLinks;
