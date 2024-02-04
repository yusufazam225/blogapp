import './App.css'
import {formatISO9075} from "date-fns";
const Blog=({title,content,summary,cover,createdAt,author})=>{
   return <div className='post'>
    <img src={'http://localhost:4000/'+cover}/>
    <div className='box'>
    <h2>{title}</h2>
    <span className='info'>
      <a className='author' href="">{author.username}</a>
      <time>{formatISO9075(new Date(createdAt))}</time>
    </span>
    <p>{summary}</p>
    </div>
  </div>
};
export default Blog