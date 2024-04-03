const express = require("express");
const router  = express.Router();

const isSupperUser=require("../middlewares/isSupperUser");
const isAdminLoggedIn = require("../middlewares/isAdminLoggedIn")

const {addQuestion , getAllQuestions}=require("../controllers/user/questionController");
const { getAllDetailsofUser } = require("../controllers/admin/userController");


router.route("/addQuestion").post(isSupperUser,addQuestion);
router.route("/getQuestionByUserId").get(isSupperUser,getAllQuestions);

//-------------------version - 2 ---------------------//
router.route("/userdeatails/:id").get(isAdminLoggedIn,getAllDetailsofUser);






module.exports = router;
