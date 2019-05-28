import React from 'react'

const mm = (method,my,friend)=>{
 method(my,friend,"OK");
}
function RequestList (props){
  
      const {list,header,method,icon,my} =props;
    
    return (
         
        <ul className="collection with-header " > 
          <li className="collection-header"><h6>{header}</h6> </li>
            { 
              list?
              list.map(item =>(
               <li className="collection-item" key={item[0]+{header}+"list"}>
                  <div>
                       {item[1].firstName+" "+item[1].lastName}
                        <a href="#!" className="secondary-content" onClick={mm.bind(this,method,my,item[1])}>
                          <i className="material-icons">{icon}</i></a>
                    </div>
               </li>

                )  
              )
              : null 
            }
            </ul>
    )
  
}

export default RequestList;
