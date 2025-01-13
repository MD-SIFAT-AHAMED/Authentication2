import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import Navber from './Components/Navber/Navber';
import Home from './Components/Home/Home';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
const App = () => {
  return (
    <BrowserRouter>
         <Navber/>   
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;