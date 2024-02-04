import Post from "../Blog";
import {useEffect, useState} from "react"
const Homepage=()=>{
    const [posts,setposts]=useState([]);
    useEffect(()=>{
        
        fetch('http://localhost:4000/post').then(response=>{
            response.json().then(post=>{
                
               setposts(post);
            })
        })
    
    },[]);
    return <div>
        
        {posts.length>0 && posts.map((post)=>{
             return <Post {...post}/>
        })}
       
       
    </div>
};
export default Homepage;