import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Navigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const Create=()=>{
    const [title,settitle]=useState('');
    const [summary,setsummary]=useState('');
    const [content,setcontent]=useState('');
    const [files,setfiles]=useState('');
    const [redirect,setredirect]=useState(false);

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      };
      async function createpost(e){
        
        const data=new FormData();
        data.append('title',title);
        data.append('summary',summary);
        data.append('content',content);
        data.append('file',files[0]);
        e.preventDefault();
      //   for (let pair of data.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }
       const response= await fetch('http://localhost:4000/post',{
        method:'POST',
        body:data,
        credentials:'include'
      });
      if(response.ok)
      {
        setredirect(true);
      }
    
     
      }


      if(redirect)
      {
        return <Navigate to={'/'}/>
      }
    return  <form className="create" onSubmit={createpost}>
            <input type="title" placeholder='title' value={title} onChange={(e)=>settitle(e.target.value)}/>
            <input type="summary" placeholder="summary" value={summary} onChange={(e)=>setsummary(e.target.value)}/>
            <input type="file"   placeholder="file"  style={{padding:'10px 5px'}} onChange={(e)=>setfiles(e.target.files)}/>
            <ReactQuill className="reactquill" modules={modules} theme="snow"/>
            <button style={{marginTop:'40px'}} type="submit">Create post</button>
        </form>
  
}
export default Create;