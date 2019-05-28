import React,{Component} from 'react'

class SearchBar extends Component {
  state ={
    search :""
  }
  searchUser = (e)=>{
    e.preventDefault()
    const {search} = this.state;
    this.props.history.push("/searchPage/"+search)
  }
  handleSearch = (e)=>{
    this.setState({search:e.target.value});
  }
  render(){
    const {search} =this.state;
  return (
    <div className="nav-wrapper center" >
      <form className="form row" onSubmit={this.searchUser}>
          <p>Arkadaşlarını Ara</p>
      <div className="input-field col s10"  style={{height:"40px"}}>
        <input id="search" type="search" className="grey lighten-1 " 
        onChange={this.handleSearch}
        value = {search}
        required/>
          <label className="label-icon " htmlFor="search"><i className="material-icons">search</i></label>
      </div>
      <div className="input-field col s2">
        <button className="btn " ><i className="material-icons">keyboard_arrow_right</i></button>
      </div>
      </form>
    </div>
  )}
}

export default SearchBar
