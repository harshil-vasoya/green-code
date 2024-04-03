import { useState } from "react";
import useGetAllLanguages from "../../../../hooks/useGetAllLanguages";
import { useNavigate, useParams } from "react-router-dom";
import addSolution from "../../../../utilities/APIcalls/addSolution";
import useGetSolutionById from "../../../../hooks/useGetSolutionById";
import editSolution from "../../../../utilities/APIcalls/editSolution";


const AddEditSolution = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  var [languages] = useGetAllLanguages();
  var [data, setData] = useGetSolutionById(id, props.edit);
  // console.log(data)
  var [message, setMessage] = useState("");
  function Languages() {
    return languages.map(e => (
      <option key={e} value={e}>{e}</option>
    ))
  }
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function sendData(id) {
    if (!props.edit) {
      data.question_id = id;

      await addSolution(data, setMessage, () => { navigate(`/admin/question/${id}`) }, () => { navigate("/login") })
    }
    else {
      data.solution_id = id;
      await editSolution(data, setMessage, () => { navigate(`/admin/question/${data.question_id}`) }, () => { navigate("/login") })
    }
  }
  return (
    <>

      <h1 className="text-center "> <span className="m-3 underline font-2">{!props.edit ? "Add " : "Edit "}Solution Page</span></h1>


      <h3 >{message}</h3>
      <div className="container text-center">
        <div>
          <textarea
            cols={50}

            className="form-control mb-3"
            type="text"
            name="title"
            value={data ? data.title : ""}

            placeholder="brute force approach"
            onChange={handleChange}
          />
        </div>

          <div>
            <select
              className="border gc-border-green  rounded-lg p-1"
              name="language"
              id="language"
              onChange={handleChange}
              value={data !== undefined ? data.language : ""}
            >

              <Languages />
            </select>
          </div>
          <div>
            <textarea
              rows={4}
            cols={50}

              id="formGroupExampleInput"
              type="text"
              name="code"
              value={data !== undefined ? data.code : ""}
              placeholder="<code>"
              onChange={handleChange}
            />
          </div>

        <button className="border gc-border-green gc-bg-green p-2 rounded-lg text-white" onClick={() => { sendData(id) }}>
          {!props.edit ? "Add " : "Edit "} Solution
        </button>
        </div>

    </>
  )
}

export default AddEditSolution;