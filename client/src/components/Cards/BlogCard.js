import { AiOutlineHeart } from "react-icons/ai"
import { MdOutlineDeleteForever } from "react-icons/md"


function Blog(props){
    const date = new Date(props.date);

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

const formattedDate = date.toLocaleDateString('en-US', options);

    return(
        <>
       <div className="border gc-border-green my-1 mx-2 gc-sh" onClick={props.onClick}>
        <div className=" m-2  text-black  flex justify-between">
            <div className="flex">
        <div>
            <span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{props.username[0].toUpperCase()}</span>
            </div>
            <div>
            <div className="mt-0 text-xl">
            {props.title} 
            </div>
            <div className=" pl-3 text-xs text-gray-300" >
                created at : {formattedDate}
            </div>
            
            </div>
        </div>

            <div className="flex py-1">
            
            <div className="px-2 text-xs text-center">
            <AiOutlineHeart className="mx-auto text-xl gc-text-green" />{props.likes}
            </div>
            {props.admin ? <MdOutlineDeleteForever onClick={(e)=>{
                e.stopPropagation()
                const check=window.confirm("are you sure to delet this blog?")
                if(check)
                {
                    props.ondelete();
                }
            }} className="text-red-500 text-3xl mx-2 hover:scale-110"/>:null}
           
            </div>
            </div>
       </div>
        </>
    )
}
export default Blog;