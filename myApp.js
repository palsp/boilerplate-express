
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
/*app.use(function(req , res , next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next();
});*/

// --> 11)  Mount the body-parser middleware  here
app.use( bodyParser.urlencoded({extended : false}))

/** 1) Meet the node console. */
console.log("Hello")

/** 2) A first working Express Server */
//app.get("/" ,  function(req , res){
 //   res.send("Hello Express")
//})

var absolutePath = __dirname + "/views/index.html"
/** 3) Serve an HTML file */
app.get("/" , function(req , res) {
  res.sendFile(absolutePath)
})

/** 4) Serve static assets  */
//app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
// var response = 'Hello json'
/*app.get("/json" , function(req , res){
    res.json({"message" : "Hello json"})
})*/

/** 6) Use the .env file to configure the app */
 process.env.MESSAGE_STYLE="uppercase";

app.get("/json" , function(req , res){
  if(process.env.MESSAGE_STYLE == "uppercase"){
      res.json({ "message" : "HELLO JSON"});
  } else {
    res.json({ "message" : "Hello json"});
  }
  
})
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now" , function( req , res , next){
  req.time = new Date().toString();
  next();
},function(req , res){
  res.json({ time : req.time})
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo" , function( req, res){
  res.json( { echo : req.params.word})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name' , function( req , res) {
  var name = { "name" : req.query.first + " " + req.query.last};
  res.json(name);
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
