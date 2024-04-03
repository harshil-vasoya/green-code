import Cookies from "js-cookie";

async function deleteQuestionById(id , callback) {
  await  fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/question/delete/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("adminToken")
      },
      body: JSON.stringify({ question_id: id })
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
            
        }
        else {
            callback();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      
  }
  export default deleteQuestionById;
