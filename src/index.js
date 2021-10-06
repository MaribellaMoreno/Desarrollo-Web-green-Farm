const express = require("express");
const app = express();
const path = require("path");
const bcryptjs = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config({path:'.env'});
const bodyParser = require("body-parser");

const session = require("express-session");



//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));


//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use(require("./routes/index"));

//DB
const connection = require("./datbase/db");

//static files
app.use(express.static(path.join(__dirname, "public")));


//listening the server
app.listen(app.get("port"), ()=>{
    console.log("server pecueco", app.get("port"));
})