import React, {   useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import {marked} from 'marked'; 
import { useNavigate } from 'react-router-dom';
import addBlog from '../../utilities/APIcalls/addBlog';
import 'easymde/dist/easymde.min.css';

const BlogEditor = () => {
  const [title , settile]=useState("");
  const [markdownText, setMarkdownText] = useState('');
  const [message,setMessage]=useState("");
  const navigate=useNavigate();
  function postdata()
  {
    if(markdownText==="" )
    {
        window.alert("please type some content");
        return;
    }
    if(title==="")
    {
        window.alert("please add Blog Title");
        return;
    }
    setMarkdownText("");
    addBlog(title,markdownText , setMessage , ()=>{navigate("/login")});
    navigate("/blog")
  }
  
  return (
    <div className='m-2'>
      {message}
      <div>
        <input type='text' value={title} name="title" placeholder='Blog Title' className='m-2 w-[50%] h-[6vh] border-b border-black focus:outline-none text-xl' onChange={(e)=>{settile(e.target.value)}}/>
      </div>
      <SimpleMDE placeholder="you can write a blog using <b>html</b>" onChange={setMarkdownText}
      //  options={{
      //   toolbar: true, // Enable the default toolbar
      //   // Other SimpleMDE options...
      // }}
        />
      <div >
        <button className='px-2 py-2 gc-bg-green text-white border rounded-lg hover:text-xl'
        onClick={()=>{
          postdata()
        }}
        >Post Blog</button>
         <div>OUTPUT</div>
         <div className='text-center text-3xl'>{title}</div>
        <div dangerouslySetInnerHTML={{ __html: marked(markdownText) }}></div>
      </div>
    </div>
  );
};

export default BlogEditor;


