import '../App.css'
import { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { Usercontext } from '../UserContext';
const Loginpage=()=>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [redirect,setredirect]=useState(false);
    const {setuserinfo}=useContext(Usercontext);
    const login=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        });
       if(response.ok)
       {
        response.json().then(userinfo=>{
            setredirect(true);
            setuserinfo(userinfo)
        })
     
       }
       else
       {
        alert('wrong credentials');
       }
    }
    if(redirect)
    {
        return <Navigate to={'/'}/>
    }
return <form onSubmit={login}>
    <div className='login'>
        <h1>Login   <FiLogIn/></h1>
    <input type='text' placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
    <input type='password' placeholder="password"  value={password} onChange={(e)=>setpassword(e.target.value)}/>
    <button ><div className='xx'>login<FiLogIn/></div></button>
    </div>
</form>
};
export default Loginpage;