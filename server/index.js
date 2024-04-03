// Configuration
require("dotenv").config();

const Storage = require("./utility/memory/storage");

require("./config/database").connect(async ()=>await Storage.reloade());

// Main Imports
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors(
	{
		origin:"*"
	}
));


const _direname =path.dirname("");
const buildPath = path.join(_direname, "../client/build");
app.use(express.static(buildPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authentication = require("./routes/authentication");
const admin = require("./routes/admin");
const home = require("./routes/home");
const test = require("./routes/test");
const user=require("./routes/user");
const blog=require("./routes/blog");
const history=require("./routes/history");

app.use("/api/v1/home", home);
app.use("/api/v1/authentication", authentication);
app.use("/api/v1/admin", admin);
app.use("/api/v1/test", test);

// -----------------------version 2 ------------------
app.use("/api/v2/user",user);
app.use("/api/v2/admin",admin);
app.use("/api/v2/blog",blog);
app.use("/api/v2/history",history);


app.listen(process.env.SERVER_PORT,()=>{
	console.log("\n------------------START-----------------------\n",)
	console.log(
		"%s\x1b[36m\x1b[1m%d\x1b[0m",
		"server is runing on port : ",process.env.SERVER_PORT
		);
})






