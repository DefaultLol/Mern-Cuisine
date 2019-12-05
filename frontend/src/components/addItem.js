import React from 'react';
import axios from 'axios';
import Header from './header';
import {Redirect} from 'react-router-dom';

export default class AddItem extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name:'',
      qty:'',
      image:'',
      categories:[],
      category:'',
      state:''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/categories')
      .then(res=>{
        this.setState({
          categories:res.data
        });
      });
  }

  onChangeName=(e)=>{
    this.setState({
      name:e.target.value
    });
  }
  onChangeQty=(e)=>{
    this.setState({
      qty:e.target.value
    });
  }

  onChangeImage=(e)=>{
    console.log(e.target.files[0]);
    this.setState({
      image:e.target.files[0]
    });
  }

  onChangeCategorie=(e)=>{
    console.log(e.target.value);
    this.setState({
      category:e.target.value
    });
  }

  saveItem=(e)=>{
    e.preventDefault();
    let data={
      name:this.state.name,
      qty:Number(this.state.qty),
      image:this.state.image.name,
      category:this.state.category
    }
    axios.post('http://localhost:5000/items/add',data)
      .then(res=> console.log(res.data));

      const formData=new FormData();
      formData.append('file',this.state.image);
      axios.post('http://localhost:5000/items/upload',formData,{
        headers:{
            'Content-type':'multipart/form-data'
        }
      });

    this.setState({
      name:'',
      qty:'',
      image:'',
      state:'Item Added'
    });
  }

  render(){
    return (
      <div>
        {(sessionStorage.getItem("connected")==false || sessionStorage.getItem("connected")==null) && <Redirect to="/login" />}
        <Header />
      <div className="offset-3 col-6">
        <h4 className="text-center">Add Item</h4>
        {this.state.state!='' && <div className="alert alert-success mt-2" role="alert">
            {this.state.state}
        </div>}
        <div className="card bg-light mt-3">
          <div className="card-body">
            <form onSubmit={this.saveItem}>
              <div className="form-group">
                <label>Name :</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
              </div>
              <div className="form-group">
                <label>Quantity :</label>
                <input type="text" className="form-control" value={this.state.qty} onChange={this.onChangeQty} />
              </div>
              <div className="form-group">
                <label>Image :</label>
                <input type="file" className="form-control" onChange={this.onChangeImage} />
              </div>
              <div className="form-group">
                <label>Categorie :</label>
                <select className="form-control" onChange={this.onChangeCategorie}>
                  <option>Select a category...</option>
                  {this.state.categories.map(elt=>{
                    return (<option key={elt._id} value={elt.name}>{elt.name}</option>)
                  })}
                </select>
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
