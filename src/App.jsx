import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import Navber from './Components/Navber/Navber';

import Home from './Components/Home/Home';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/privateRoute/PrivateRoute';

export const UserContext = createContext();
const App = () => {
  const [loggedUser,setLoggedUser] = useState({});
  return (
    <UserContext.Provider value={[loggedUser,setLoggedUser]}>
      <BrowserRouter>
          <Navber/>   
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/contact' element={
                <PrivateRoute>
                  <Contact/>
                </PrivateRoute>
                }
                />
              <Route path='/login' element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;