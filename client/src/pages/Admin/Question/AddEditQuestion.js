import { useState } from "react";
import "./../../../scss/form.scss";

import useGetAllCategories from "../../../hooks/useGetAllCategories";

import { useForm } from "react-hook-form";
import useGetQuestionDataById from "../../../hooks/useGetQuestionByID";
import { useNavigate, useParams } from "react-router-dom";
import addQuestion from "../../../utilities/APIcalls/addQuestion";
import editQuestion from "../../../utilities/APIcalls/editQuestion";
import useGetAllLanguages from "../../../hooks/useGetAllLanguages"
import addQuestionByUser from "../../../utilities/APIcalls/addQuestionByUser";




const AddEditQuestion = (props) => {

	const [solutionCount, setSolutionCount] = useState(1);
	const navigate = useNavigate();
	const params = useParams();
	const [questionData] = useGetQuestionDataById(params.id, !props.edit);
	const [message, setMessage] = useState("");

	delete questionData.solutions;
	delete questionData.__v;
	delete questionData._id;
	delete questionData.comments;
	delete questionData.isLiked;
	delete questionData.likes


	// var defaultValues = questionData;

	const [allLanguages] = useGetAllLanguages();


	const [categories] = useGetAllCategories();

	const { register, handleSubmit } = useForm({
		values: questionData
	});




	async function submitForm(data) {
		
		
			if(props.role==="user")
			{
				console.log("user")
				await addQuestionByUser(data, setMessage, () => { navigate("/login") }, () => { navigate("/") });
				return;
			}
			else
			{
				if (!props.edit)
				await addQuestion(data, setMessage, () => { navigate("/login") }, () => { navigate("/admin/question") });
			else {
				data.question_id = params.id;
				console.log(data)
	
				await editQuestion(data, setMessage, () => { navigate("/login") }, () => { navigate("/admin/question") });
			}
			}
		

	}


	function Categories() {
		return categories.map((val, index) => (
			<span className="flex justify-between items-center p-1 w-fit h-fit" key={index}>
				<label className="mx-1">{val}</label>
				<input type="checkbox" {...register("categories")} value={val} />
			</span>

		));
	}

	function SolutionForm() {
		let arr = []
		for (let i = 0; i < solutionCount; i++) {
			arr.push(
				<div className="flex flex-col" key={i}>
					<div className="flex justify-between">
						<input className="m-1 w-full" type="text" {...register("solutions." + i + ".title")} placeholder="title" />
						<select className="m-1 w-fit" {...register("solutions." + i + ".language")}>
							<option>Language</option>
							{
								allLanguages.map((lan) => <option value={lan}>{lan}</option>)
							}
						</select>
					</div>

					<textarea className="m-1" rows={7} {...register("solutions." + i + ".code")} placeholder="code" />
				</div>
			)
		}
		return arr;
	}



	return (
		<div className="overflow-x-auto h-[90vh] w-[100%]">
			<span className="text-red-500">{message}</span>
			<h1 className="text-center text-2xl p-2">{props.edit ? "Edit Question" : "Add Question"}</h1>


			<div className="flex justify-center">

				<form onSubmit={handleSubmit(submitForm)} className="flex w-[50%] flex-col">

					<div className="flex justify-between">
						<input className="m-1" type="number" {...register("number")} placeholder="Number" />
						<select className="m-1" {...register("level")}>
							<option disabled>Level</option>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>

					<input className="m-1" type="text" {...register("title")} placeholder="Title" />
					<textarea className="m-1" rows={4} {...register("question")} placeholder="Question" />

					<div className="flex justify-between">
						<div className="flex flex-wrap h-fit p-3 px-7">
							<Categories />
						</div>
						<div className="w-full">
							<div className="flex justify-end">
								{!props.edit && <button className="gc-bg-green rounded p-1 px-2 hover:scale-105 m-1 text-white" onClick={() => setSolutionCount(p => p + 1)}>add Solution</button> }
							</div>
							{!props.edit && <SolutionForm />}
						</div>
					</div>


					<input className="gc-bg-green rounded p-1 px-2 hover:scale-105 m-1 text-white" type="submit" />
				</form>
			</div>

		</div>
	)
}

export default AddEditQuestion;