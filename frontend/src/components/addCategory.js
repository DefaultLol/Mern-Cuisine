import React from 'react';
import axios from 'axios';
import Header from './header';
import {Redirect} from 'react-router-dom';

export default class AddCategory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      state:''
    }
  }

  onChangeName=(e)=>{
    this.setState({
      name:e.target.value
    });
  }
  saveItem=(e)=>{
    e.preventDefault();
    const name=this.state.name;
    const data={
      name:name
    }
    axios.post('http://localhost:5000/categories/add',data);
    this.setState({
      state:"Category Saved Succefully"
    });
    setTimeout(()=>{
      this.setState({
        state:""
      });
    },1500);
  }
  render(){
    return(
      <div>
        {(sessionStorage.getItem("connected")==false || sessionStorage.getItem("connected")==null) && <Redirect to="/login" />}
        <Header />
      <div className="offset-3 col-6">
        <h4 className="text-center">Add Category</h4>
        {this.state.state!='' && <div className="alert alert-success" role="alert">
            {this.state.state}
        </div>}
        <div className="card bg-light mt-3">
          <div className="card-body">
            <form onSubmit={this.saveItem}>
              <div className="form-group">
                <label>Category Name :</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
              </div>
              <div className="form-group">
                <button className="btn btn-success col-12">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
