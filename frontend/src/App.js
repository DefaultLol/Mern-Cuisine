import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import AddItem from './components/addItem';
import AddCategory from './components/addCategory';
import Categories from './components/categorie';
import Login from './components/login';
import {ProtectedRoute} from './components/ProtectedRoute';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Categories} />
        <Route path="/addItem" exact component={AddItem} />
        <Route path="/addCategory" exact component={AddCategory} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
