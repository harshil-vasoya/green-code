const express = require("express");
const router  = express.Router();
const isAdminUserSuperUserLoggedIn =require("./../middlewares/isAdminUserSuperUser");
const { postBlog, getAllBlog, likeBlog, deleteBlog, getBlogById, commentOnBlog, deleteBlogComment } = require("../controllers/blog");
const isAdminLoggedIn = require("../middlewares/isAdminLoggedIn");

router.route("/AllBlog").get(isAdminUserSuperUserLoggedIn ,getAllBlog );
router.route("/:id").get(isAdminUserSuperUserLoggedIn ,getBlogById );

router.route("/like/:id").post(isAdminUserSuperUserLoggedIn,likeBlog);
router.route("/addcomment/:id").post(isAdminUserSuperUserLoggedIn , commentOnBlog);
router.route("/add").post(isAdminUserSuperUserLoggedIn ,postBlog );



router.route("/deleteCommenet").delete(isAdminLoggedIn , deleteBlogComment );
router.route("/delete").delete(isAdminLoggedIn ,deleteBlog );




module.exports = router;
