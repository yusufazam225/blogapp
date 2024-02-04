import { useState } from 'react';
import '../App.css'
import { IoMdLogIn } from "react-icons/io";
const Registerpage=()=>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const register=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
        })
       
        if(response.status===200)
        {
            alert("successful");
        }
        else
        {
            alert("unsuccessful");
        }
    }
    
return <form onSubmit={register}>
    <div className='login' >
        <h1>Register   <IoMdLogIn/></h1> 
    <input type="text" placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
    <input type="password" placeholder="password" value={password}  onChange={(e)=>setpassword(e.target.value)}/>
    <button><div className='xx'>Register<IoMdLogIn/></div></button>
    </div>
</form>
};
export default Registerpage;