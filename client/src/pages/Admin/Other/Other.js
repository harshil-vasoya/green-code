import { useState } from "react";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import useGetAllLanguages from "../../../hooks/useGetAllLanguages";
import { MdDeleteForever } from "react-icons/md";
import { deleteInList, addInList } from "../../../utilities/APIcalls/adddeleteinList";
import { useNavigate } from "react-router-dom";


const Other = () => {
	const [category, setCategory] = useGetAllCategories();
	const [language, setLanguage] = useGetAllLanguages();
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const Language = () => {
		const [data, setdatal] = useState("");
		
		function handleDelete(e) {
			const confim = window.confirm("are you sure you want to delete this language?")
			if (confim) {
				deleteInList("language", e, setMessage, () => { navigate("/login") })
				setLanguage(language.filter((el) => { return el !== e }))
			}
		}

		function handleAdd(data) {
			if (data !== "") {
				addInList("language", data, setMessage, () => { navigate("/login") })
				setLanguage([...language, data])
			}
		}
		
		const printLanguage = language.map((e, index) => {
			return (

				<tr className="" key={index}>
					<td className="ms-2 border p-1 ps-2">{e}</td>
					<td className="border flex justify-center p-1"><MdDeleteForever className="text-red-500 text-2xl" onClick={() => { handleDelete(e) }} /></td>
				</tr>

			)
		})
		return (
			<>
				<br />
				<div>
					<div className="flex my-2">
						<input className="border gc-border-green w-[220px] my rounded" type="text" name="level" onChange={(e) => { setdatal(e.target.value) }} /><br />
						<button className="bg-[#7cc529] border w-[80px] rounded-lg p-2 text-xl" onClick={(e) => { handleAdd(data) }}>submit</button>
					</div>

					<table className="table-auto border w-full">
						<tbody>
							{printLanguage}
						</tbody>
					</table>


				</div>
			</>
		)
	}
	const Catagories = () => {
		const [data, setdata] = useState("");
		function handleDelete(e) {
			const confim = window.confirm("are you sure you want to delete this cataogry?")
			if (confim) {
				deleteInList("category", e, setMessage, () => { navigate("/login") })
				setCategory(category.filter((el) => { return el !== e }))
			}
		}
		function handleAdd(data) {
			if (data !== "") {
				addInList("category", data, setMessage, () => { navigate("/login") })
				setCategory([...category, data])
			}
		}

		const printcategory = category.map((e, index) => {
			return (

				<tr key={index}>
					<td className="ms-2 border p-1 ps-2">{e}</td>
					<td className="border flex justify-center p-1"><MdDeleteForever className="text-red-500 text-2xl" onClick={() => { handleDelete(e) }} /></td>
				</tr>

			)
		})
		return (
			<>
				<div>
					<div className="flex my-2">
						<input className="border gc-border-green w-[220px] rounded" type="text" name="level" onChange={(e) => { setdata(e.target.value) }} /><br />
						<button className="bg-[#7cc529] border rounded-lg w-[80px] p-2 text-xl" onClick={() => { handleAdd(data) }} >submit</button>
					</div>
					<table className="w-full">
						<tbody>
						{printcategory}
						</tbody>
						
					</table>
				</div>
			</>
		)
	}

	return (<>
				<div className="text-red-500 m-3">{message}</div>

		<div className="flex">
			<Language />
			<Catagories />
		</div>
		</>
	)
}

export default Other;