import { Link, useNavigate } from "react-router-dom";
import { QuestionCard } from "../components/Cards/QuestionCard";
import QuestionCount from "../components/Cards/QuestionCount";
import useGetAllQuestions from "../hooks/useGetAllQuestions";
import { useEffect, useState } from "react";
import useGetAllCategories from "../hooks/useGetAllCategories";
import searchQuestion from "../utilities/APIcalls/searchQuestion";

import { FiSearch } from "react-icons/fi";
import { SiAddthis } from "react-icons/si";
import Cookies from "js-cookie";



const Home = () => {

	const [allQuestions] = useGetAllQuestions();
	const [Allcatagoies] = useGetAllCategories();

	const [level, setLevel] = useState("");
	const [category, setCategory] = useState("");
	const [count, setCount] = useState({ easy: 0, medium: 0, hard: 0 });

	const [searchString, setSearchString] = useState("");

	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [displayQuestion, setDisplayQuestion] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {

		setDisplayQuestion(allQuestions)
		setFilteredQuestions(allQuestions)

		let easy = 0, medium = 0, hard = 0;
		for (let val of allQuestions) {
			if (val.level === 'easy') easy++;
			if (val.level === 'medium') medium++;
			if (val.level === 'hard') hard++;
		}
		setCount({ easy, medium, hard })

	}, [allQuestions])


	useEffect(() => {

		let temp = filteredQuestions;
		if (level !== "") temp = filteredQuestions.filter((e) => e.level === level);
		if (category !== "") temp = temp.filter((e) => e.categories.includes(category));
		setDisplayQuestion([...temp]);

	}, [level, category, filteredQuestions])


	function handeldata(e) {
		setSearchString(e.target.value)
		if (e.target.value === "") setFilteredQuestions([...allQuestions]);
	}
	async function searchData() {
		await searchQuestion(searchString, setFilteredQuestions, () => { navigate("/login") })
	}

	return (
		<div className="flex justify-between">

			<div className="w-[100%] p-4">

				<div className="md:flex-row flex flex-col-reverse justify-between items-center">

					<div className="flex w-full justify-around md:justify-start">
						<select className="border me-2 my-2  text-lg gc-border-green rounded-md" onChange={(e) => { setLevel(e.target.value) }} >
							<option value="">Level</option>
							<option value="easy" >Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>

						<select className="border ms-2 my-2 text-lg gc-border-green rounded-md" onChange={(e) => { setCategory(e.target.value) }} >
							<option value="">Categories</option>
							{Allcatagoies.map((data, index) => <option key={index} value={data}>{data}</option>)}
						</select>
					</div>

					<div className="flex p-1 max-w-sm justify-between border gc-border-green items-center rounded gc-shadow-62"  >
						<input type="text" placeholder="Search..." className="outline-none border-none w-full h-[100%] px-1 text-sm focus:outline-none rounded bg-inherit" onChange={(e) => handeldata(e)} />
						<button className="gc-bg-green p-1 rounded-md h-full hover:scale-90 duration-200"><FiSearch className="text-lg text-white font-extrabold" onClick={() => { searchData() }} /></button>
					</div>
					{
						Cookies.get("superuserToken")!==undefined ? 
					<SiAddthis className="gc-text-green text-3xl hover:scale-110 ml-10" onClick={()=>navigate("/user/question/add")} />
						:
						null
					}


				</div>

				<div className=" p-3 gc-shadow-25 rounded mt-4 overflow-auto h-[78vh]">
					{displayQuestion.map((data, index) =>
						<Link to={`/question/${data._id}`} key={index}>
							<QuestionCard className="my-3 gc-shadow-23" number={data.number} title={data.title} likes={data.likes} level={data.level} />
						</Link>
					)}
					
				</div>

			</div>

			<div className="w-[30%] md:flex flex-col items-center hidden">
				<QuestionCount className="m-5" count={allQuestions.length} Easy={count.easy} Medium={count.medium} Hard={count.hard} />
			</div>

		</div>
	)
}
export default Home;