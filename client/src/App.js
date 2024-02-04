import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout.js';
import Homepage from './pages/Homepage.js';
import Loginpage from './pages/Loginpage.js';
import Registerpage from './pages/Registerpage.js';
import Create from './pages/Create.js';
import { UsercontextProvider} from './UserContext.js';
function App() {
 return <React.Fragment>
    <UsercontextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/register' element={<Registerpage/>}/>
        <Route path='/create' element={<Create/>}/>
        </Route>
        
   </Routes>
   </UsercontextProvider>
  
 </React.Fragment>
};

export default App;
