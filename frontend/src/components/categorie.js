import React from 'react';
import axios from 'axios';
import {Modal,Button} from 'react-bootstrap';
import Header from './header';
import {Redirect} from 'react-router-dom';

export default class Categorie extends React.Component{
  constructor(props){
    super(props);
    console.log(sessionStorage.getItem("connected")+" hahah");
    this.state={
      categories:[],
      items:[],
      currentCat:"",
      currentId:"",
      currentImage:"",
      currentQty:"",
      currentName:"",
      show:false
    }
  }

  check=()=>{
    if(sessionStorage.getItem("connected")!=null){
      console.log("Connected");
    }
    else{
      //return <Redirect to="/login" />
      this.props.history.push('/login');
    }
  }
  getItems=async (e)=>{
    e.preventDefault();
    const name=e.target.dataset.id;
    let res = await axios.get(`http://localhost:5000/items/findByCat/${name}`);
    let data=res.data;
    this.setState({ items: data,currentCat:name });
    console.log(this.state.items);
  }

  setCurrentId=(e)=>{
    e.preventDefault();
    const id=e.target.dataset.id;
    axios.get(`http://localhost:5000/items/${id}`)
      .then(res=>{
        this.setState({
          currentId:id,
          currentImage:res.data.image,
          currentQty:res.data.qty,
          currentName:res.data.name,
          show:true
        });
      });
  }

  handleClose=()=>{
    this.setState({ show: false });
  }

  deleteItem=async(e)=>{
    await axios.delete(`http://localhost:5000/items/${this.state.currentId}`);
    let res = await axios.get(`http://localhost:5000/items/findByCat/${this.state.currentCat}`);
    let data=res.data;
    this.setState({ items: data,show:false });
  }

  onChangeQty=(e)=>{
    this.setState({
      currentQty:e.target.value
    });
  }

  updateQty=async(e)=>{
    e.preventDefault();
    const item={
      qty:this.state.currentQty
    }
    await axios.put(`http://localhost:5000/items/update/${this.state.currentId}`,item);
    let res = await axios.get(`http://localhost:5000/items/findByCat/${this.state.currentCat}`);
    let data=res.data;
    this.setState({ items: data,show:false });
  }

  componentDidMount(){
    axios.get('http://localhost:5000/categories')
      .then(res=>{
        this.setState({
          categories:res.data
        });
      });
  }
  render(){
    return (
      <div>
        {(sessionStorage.getItem("connected")==false || sessionStorage.getItem("connected")==null) && <Redirect to="/login" />}
        <Header />
      <div className="offset-2">
        <div className="row">
          {this.state.categories.map((categorie)=>{
            return (
            <h5 key={categorie._id}><a href="" style={{marginLeft:"20px"}} data-id={categorie.name} onClick={this.getItems} className="badge badge-pill badge-secondary">{categorie.name}</a></h5>
          )
          })}
      </div>
      <br />
        <div className="row">
          {this.state.items.map(item => {
            return (
              <div className="card ml-4" style={{width: "12rem", height:"17rem"}} key={item._id}>
                <p className="text-center"><img src={`http://localhost:5000/uploads/${item.image}`} className="card-img-top" alt="..." style={{width:"100px",height:"100px"}} /></p>
                <div className="card-body text-center">
                  <h5 className="card-title"><strong>{item.name}</strong></h5>
                  <p className="card-text"><strong>Quantity :</strong> {item.qty}</p>
                  <a href="#" onClick={this.setCurrentId} data-id={item._id} className="btn btn-primary">Edit item</a>
                </div>
              </div>
            )
          })}
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.currentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <img className="col-5" src={`http://localhost:5000/uploads/${this.state.currentImage}`} style={{width:'150px',height:'150px'}} />
            <input type="text" className="form-control col-3 mt-5 ml-4" value={this.state.currentQty} onChange={this.onChangeQty} />
            <button className="btn btn-primary col-2 ml-2 mt-5" style={{height:'40px'}} onClick={this.updateQty}>Edit</button>
          </div>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.deleteItem}>
            Delete Item
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
    )
  }
}
