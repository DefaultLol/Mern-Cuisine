import React from 'react';
import auth from './Auth';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      state:''
    }
  }

  onChangeUsername=(e)=>{
    this.setState({
      username:e.target.value
    });
  }

  onChangePassword=(e)=>{
    this.setState({
      password:e.target.value
    });
  }

  loginCheck=(e)=>{
    e.preventDefault();
    const username=this.state.username;
    const password=this.state.password;

    if(username=="admin" && password=="admin"){
      sessionStorage.setItem('connected',true);
      this.props.history.push('/');
    }
    else{
      this.setState({
        state:'Error in inputs'
      });
    }
  }

  render(){
    return (
      <div className="test">
        <div className="offset-3 col-5" style={{marginLeft:"30%"}}>
          <div>a</div>
          <h5 className="text-center" style={{color:"white",marginTop:"23%"}}>Admin login</h5>
            {this.state.state!='' && <div className="alert alert-danger" role="alert">
                {this.state.state}
            </div>}
          <div className="card bg-light mt-4">
            <div className="card-body">
              <form onSubmit={this.loginCheck}>
                <div className="form-group">
                  <label><strong>Username :</strong></label>
                  <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                </div>
                <div className="form-group">
                  <label><strong>Password :</strong></label>
                  <input type="password" className="form-control" value={this.state.passwords} onChange={this.onChangePassword} />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary col-12">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
