


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { apply } = require('body-parser');
const request = require('request');
var axios = require("axios").default;
var unirest = require("unirest");
const https = require("https");

const app= express();

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
 res.render("query")
});

app.get("/main",(req,res)=>{
    res.render("main");
   });
   
   

   

app.post("/query",(req,res)=>{
 const data = req.body.query;
 console.log(data);



	 

 /*
 var req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

 req.headers({
	 "content-type": "application/x-www-form-urlencoded",
	 "accept-encoding": "application/gzip",
	 "x-rapidapi-key": "dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb",
	 "x-rapidapi-host": "google-translate1.p.rapidapi.com",
	 "useQueryString": true
 });
 
 req.form({
	 "q": data,
	 "target": "es",
	 "source": "en"
 });
 
 
 req.end( async  function (response )  {
	 const data  = await response.body;
	 const Fdata =  await data.data.translations[0].translatedText;
	 console.log(Fdata);
	 res.render("main", {Fdata:Fdata} );
 
 });
*/


var req = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/translate");

req.query({
	"api-version": "3.0",
	"to": "ne",
	"textType": "plain",
	"profanityAction": "NoAction"
});

req.headers({
	"content-type": "application/json",
	"x-rapidapi-key": "dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb",
	"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
	"useQueryString": true
});

req.type("json");
req.send([
	{
		"Text": data,
	}
]);

req.end(function (resquest) {
	if (res.error) throw new Error(resquest.error);

	const data  = resquest.body;
	const Fdata  = data[0].translations[0].text ; 
	console.log(Fdata);
	
res.render("main", {Fdata:Fdata} );

});


});










app.listen(3000,()=>{
    console.log("server is started at port 3000");
});