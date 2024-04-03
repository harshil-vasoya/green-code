import { Link, useNavigate } from "react-router-dom";
import Blog from "../../components/Cards/BlogCard";
import useGetAllBlogs from "../../hooks/useGetAllBlogs";
import deleteBlogByid from "../../utilities/APIcalls/deleteBlog";

function BlogHome(props)
{
    const [data,setData]=useGetAllBlogs();
    const [tempdata]=useGetAllBlogs();
    

    const navigate = useNavigate();

    function searchData(i)
    {
        setData([...data.filter((e)=>{
            return e.title.toLowerCase().includes(i.target.value.toLowerCase())
        })])
    }

    async function deleteBlog(id)
    {
        const confirm=window.confirm("are you sure you want to delete this blog")
        if(confirm)
        {
        setData([...data.filter((e)=>{
            return e._id!==id
        })])

    await deleteBlogByid(id,()=>{navigate("/login")})
        }
    }
    function navigatefun(id)
    {
        console.log(id)
        if(props.admin)
        return navigate("/admin/blog/"+id)

        navigate("/blog/"+id);

    }
    return(
        <>
        <div className="w-[70%] text-right">
        <input type='text'  name="title" placeholder='Serch by title or username' className='p-2 text-xs mt-2 w-[12vw] h-[4vh] border rounded-lg focus:outline-none focus:outline-black focus:outline-1 ' onKeyDown={(e)=>{
            if(e.key==="Backspace")
            setData([...tempdata])
        }} onChange={(e)=>{searchData(e)}} />
        <Link to="/blog/add">
        <button className="px-2 gc-bg-green text-white py-1 ms-1 rounded-lg hover:text-lg"> new + </button></Link>
        </div>
        <div className="overflow-y-auto h-[84vh]  gc-shadow-22 w-[71vw] m-auto">
        {data? data.map((e)=>{
            return(
            <Blog admin={props.admin} title={e.title} date={e.date} likes={e.likes} username={e.user_id.username} Blogid={e._id} user_id={e.user_id._id} ondelete={()=>{deleteBlog(e._id)}} onClick={()=>{navigatefun(e._id)}} key={e._id}/>
            )
        }):null

        }
        </div>

        </>
    )
}
export default BlogHome;