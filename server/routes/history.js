const express = require("express");
const router  = express.Router();


const {getAllDeleteHistory} = require("./../controllers/admin/history");
const isAdminLoggedIn = require("../middlewares/isAdminLoggedIn");
router.route("/all").get(isAdminLoggedIn, getAllDeleteHistory);

module.exports = router;