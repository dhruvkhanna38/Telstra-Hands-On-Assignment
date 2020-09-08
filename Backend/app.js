const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs");
const bodyParser  = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname ,"public")));
app.set("views", path.join(__dirname , "views"));
require("./connectToMongo");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const indexRoutes = require("./routes/index");
const articleRoutes = require("./routes/articles");


app.use("/" , (req, res, next)=>{
    console.log("Request recieved at " , (new Date().toTimeString()));
    next();
    console.log("Response recieved at " , (new Date().toTimeString()));
});


app.use("/" , indexRoutes);
app.use("/articles" ,articleRoutes );


app.use((req, res, next)=>{
    const error = new Error("Page Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{   //error handling middleware. Must have 4 arguments.
    res.status(error.status || 500).send(error.message);
}); 


app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(`Listening on ${PORT}`);
    }
});


