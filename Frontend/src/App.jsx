import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Register from './components/Register';
import Login from './components/login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path = '/register' element={<Register/>}></Route>
           <Route path = '/login' element = {<Login/>}></Route>
           <Route path = '/dashboard' element = {<Dashboard/>}></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
