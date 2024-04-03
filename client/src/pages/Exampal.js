import CommentCard from "../components/Cards/CommentCard";
import UserCard from "../components/Cards/UserCard";
import QuestionCard from "../components/Cards/QuestionCard";

const Exampal = () =>{

	const d = new Date();
	return(
		<>
		<div className="p-6 w-1/2">
			<CommentCard username="rpraiyani" className="m-2" comment="this is for testing akjd lkfjs jdkfe skdfi string font style and the other" date={d.toDateString()}  />
			<CommentCard admin username="rpraiyani" className="m-2" comment="this is for testing akjd lkfjs jdkfe skdfi string font style and the other" date={d.toDateString()}  />
			<QuestionCard number="3" title="hljklsdjm skdj ljsd lfjs dlfkjsld fljsdlkfj lskdjflk jdlf" level="hard" likes="34" admin />
		</div>
		<UserCard onRoleChange={()=>console.log("change role")} username="rpraiyani" email="rpraiyani70@gmail.com" role="admin" />
		<UserCard username="rpraiyani" email="rpraiyani70@gmail.com" role="user" />

		</>
	);
}

export default Exampal;