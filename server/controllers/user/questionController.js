const Validator = require("./../../utility/validation/validator");
const Question = require("./../../models/question");
const Solution = require("./../../models/solution");

const Storage = require("./../../utility/memory/storage");


exports.addQuestion = async (req, res) => {
	var { number, title, question, categories, level, solutions   } = req.body;
	var isAccpeted = false;
	var user_id = req.user_id;


	if (!(title && question && categories && level && solutions) || solutions.length === 0)
		return res.json({ status: "MISSING_FIELD", message: "all fileds are required." });

	categories = [...new Set(categories)];

	if (!Validator.validate("question", question))
		return res.json({ status: "INVALID", message: "Question is not valid" });
	if (!Validator.validate("questionTitle", title))
		return res.json({ status: "INVALID", message: "Question's Title is not valid" });
	if (!Validator.validateLevel(level))
		return res.json({ status: "INVALID", message: "Question's level is not valid" });
	if (!Validator.validateCategory(...categories))
		return res.json({ status: "INVALID", message: "Question's categories are not valid" });

	for (let sol of solutions) {
		const { language, title, code } = sol;
		if (!(language && title && code))
			return res.json({ status: "MISSING_FIELD", message: "all fileds are required in solutions." });
		if (!Validator.validate("solutionTitle", title))
			return res.json({ status: "INVALID", message: "Solution's Title is not valid" });
	}

	if (number) {
		if (await Question.exists({ number }))
			return res.json({ status: "EXIST", message: "this number is already assigned." });
		if (number > Storage.lastQuestionNumber) Storage.lastQuestionNumber = number;
	} else {
		Storage.lastQuestionNumber++;
		number = Storage.lastQuestionNumber;
	}

	try {
		var data = await Question.create({ number, title, question, categories, level , isAccpeted ,user_id});
		for (let sol of solutions) {
			let { language, title, code } = sol;
			await Solution.create({ question_id: data._id, language, title, code });
		}
	} catch (error) {
		await Storage.reloade();
		return res.json({ status: "X", message: error.message, error });
	}

	res.json({ status: "OK", data });
}

exports.getAllQuestions = async (req, res) => {
	var user_id=req.user_id;
	try {
			var data = await Question.find({user_id}).sort({ number: 1 });
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong." })
	}

	return res.json({ status: "OK", data });

}