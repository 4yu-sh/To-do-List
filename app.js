const express = require("express");
const bodyParser = require("body-parser");
const { list } = require("postcss");
const date = require(__dirname + "/date.js")
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" ,"ejs");
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/",function(req,res){
    const day = date.getDate();
        res.render("list", {listTitle: day, newListItems: items })    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems})
}) 

app.post("/",function(req,res){

    const item = req.body.newTask;

    if(req.body.list == "Work List"){
        workItems.push(item);

        res.redirect("/work");
    }else{
        
    items.push(item);

    res.redirect("/");

    }
})

app.listen( 3000,function(){
    console.log("Server is running on port 3000");
})