var express=require("express");
//var psList=require("ps-list");
const { snapshot } = require("process-list");
const fkill=require("fkill");
 


var app=express();


var processes=[];

const start=async function(){
	const tasks = await snapshot('pid', 'name','cpu','starttime','priority');
	//console.log(tasks);
	processes.splice(0,processes.length);
			tasks.forEach(function(task){
				processes.push(task);
					});
	app.get("/",function(req,res)
	{
		res.render("home.ejs",{tasks:processes});
	});	
	
			    
}


//start();
setInterval(function(){
	start();
},5000);
// console.log(processes[1]);

// app.get("/",function(req,res){
// 	res.render("home.ejs")
// });


app.get("/kill/:task_id",function(req,res)
	{
		var id=req.params.task_id;
	    //console.log(id);
	    fkill(id,async function(){
	        tasks = await snapshot('pid', 'name');
	        processes.splice(0,processes.length);
			tasks.forEach(function(task){
				processes.push(task);
					});
			app.get("/",function(req,res)
			{
				res.render("home.ejs",{tasks:processes});
			});	
	    })
	    //res.redirect("/");
	});





// Tell Express to listen to requests

app.listen(3000,function(){
	console.log("Server listening on Port 3000");
});