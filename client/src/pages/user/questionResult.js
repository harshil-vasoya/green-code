import QuestionCard from "../../components/Cards/QuestionCard";
import useGetAllQuestionByUserID from "../../hooks/useGetAllQuestionByUserId";

function QuestionResult()
{

    const [data ] = useGetAllQuestionByUserID();
    function PrintData(data){
        return(<>
            {
                data.map((e, index) =>
                    <QuestionCard className="my-3 gc-shadow-23" number={e.number} title={e.title} likes={e.likes} superuser={true} level={e.level} status={e.isAccpeted} key={index}/>
        )}
        </>
        )
    }
    
    return(
        <>
        <div className=" p-3 gc-shadow-25 w-[70%] ml-[5vw] rounded mt-4 overflow-auto h-[78vh]">
				{PrintData(data.filter(val => val.isAccpeted === true))}	
				{PrintData(data.filter(val => val.isAccpeted === false))}	
					
				</div>
        </>
    )
}
export default QuestionResult;