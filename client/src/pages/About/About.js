

const About = () => {
	return (
		<>
			<div className="h-[87vh] overflow-auto">
				<div className="h-[70vh] w-[80vw] mt-2 m-auto">
					<img src="https://admission.darshan.ac.in/Default/ClientPanel/media/DU_Campus_AboutUs.jpg" className="w-[100%] h-[100%] object-cover " alt="" />
					{/* <span className="w-[100%] h-[70vh] gc-bg-green absolute top-0 left-0 opacity-40 text-7xl text-white flex items-center ">Darshan University </span> */}
				</div>
				<div className="min-h-[30vh] max-h-auto border m-2 gc-border-green rounded-lg p-1 min-w-[50vw] mt-2 " >

					Developing a <b className="text-xl">"Code Bank"</b> as a college project involves creating a multi-user system with different roles and functionalities. Here's an outline to guide you in developing such a system:
					<br />
					<div className="ms-3">
					<div className="mt-2">
					<b className="text-xl">User Roles</b><br />

					<b className="ms-3">Admin</b>:
					<p className="display: inline-block">
					 Responsible for managing questions, answers, CRUD operations, blogs, comments, and users.</p><br />
					<b className="ms-3">Superuser</b>: 
					<p className="display: inline-block">
					Can request to add new questions. Requires approval from Admin.</p><br />


					<b className="ms-3">User</b>:
					<p className="display: inline-block">
					 Can view questions, like them, comment on them, add blogs , and comment on blogs.</p>
					</div>
					<div className="mt-2">

					<b className="text-xl">Functionalities</b><br />
					<b className="ms-3">Admin Panel</b>:
					<li className="ms-10">
					CRUD operations for questions, solutions, comments, blogs, and users.
					</li><li className="ms-10">
					Approval system for Superuser requests to add questions.<br />
					</li>
					

					<b className="ms-3">Superuser</b>:
<li className="ms-10">
Can request to add new questions.

</li>
<li className="ms-10">
Need Admin approval to display them to Users.<br />
</li>
					<b className="ms-3">User Interface</b>:

					<li className="ms-10">View questions, solutions, blogs.</li>
					<li className="ms-10">Like questions and blog.</li>
					<li className="ms-10">Comment on questions and blogs.</li>
					<li className="ms-10">Add new blogs.
					</li>
					</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default About;