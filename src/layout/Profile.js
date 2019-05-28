import React from 'react';


function Profile(props) {
  if(props.profile) {
    const {firstName,lastName,birthday,job,country,relationship,gender} = props.profile;

  return (
    <div className="row">
        <div className="col s12 l6"><p>İsim : {firstName}</p> </div>
        <div className="col s12 l6"><p>Soyadı : {lastName}</p> </div>
        <div className="col s12 l6"><p>Doğum Tarihi :{birthday}</p> </div>
        <div className="col s12 l6"><p>Meslek : {job}</p> </div>
        <div className="col s12 l6"><p>Memleket : {country}</p> </div>
        <div className="col s12 l6"><p>İlişki Durumu : {relationship}</p> </div>
        <div className="col s12 l6"><p>Cinsiyet : {gender}</p> </div>

    </div>
  )
  }else return(
    <div>
      <h3>YÜKLENİYOR</h3>
    </div>
  )
}

export default Profile;
