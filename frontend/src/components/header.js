import React from 'react';
import logo from '../img/logo.jpg';
import auth from './Auth';
import { Redirect } from 'react-router-dom';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  }

  logoutSite=()=>{
    sessionStorage.clear();
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="offset-1 col-2">
            <img src={logo} width="100" height="100" />
          </div>
          <div className="col-2" style={{marginTop: "3%"}}>
            <a href="/" className="btn btn-primary">View Inventory</a>
          </div>
          <div className="col-2" style={{marginTop: "3%"}}>
            <a href="/addItem" className="btn btn-success">Add Inventory</a>
          </div>
          <div className="col-2" style={{marginTop:"3%"}}>
            <a href="/addCategory" className="btn btn-warning">Add Category</a>
          </div>
          <div className="col-2" style={{marginTop:"3%"}}>
            <a href="/login" onClick={this.logoutSite} className="btn btn-danger">Log Out</a>
          </div>
        </div>
        <br /><br />
      </div>
    )
  }
}
