import { useContext, useEffect, useState } from 'react';
import './App.css'
import { FaBlog } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Usercontext } from './UserContext';
const Navbar=()=>{
  const {setuserinfo,userinfo}=useContext(Usercontext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
      
    }).then(response=>{
      response.json().then(userinfo=>{
        setuserinfo(userinfo);
      })
      .catch((e)=>{
        console.log("Catch 1");
      })
    })
    .catch((e)=>{
     // console.log(username);
      console.log("Catch 2");
    })
  },[]);
    const username=userinfo?.username;
  const logout=()=>{
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST'
    })
    setuserinfo(null);
  }

  
   return  <header>
    <Link to="/" className='logo'><FaBlog />BLOG APP</Link>
   
    <nav>
    <FaLock/>

    {username && <><Link to='/create'>create new post</Link>
      <a>/</a>
      <Link to='/' onClick={logout}>logout{`(${username})`}</Link></>
    }

    {!username && <><Link to='/login'>Login</Link>
      <a>/</a>
      <Link to='/register'>Register</Link></>
    }
      
    </nav>
  </header>
};
export default Navbar;