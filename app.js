// jshin esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const res = require("express/lib/response");
const https = require("https");
const { options } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res)=>{
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email =  req.body.email;
    
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                marge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/3a7c6f594c";

    const options = {
        method: "POST",
        auth: "StiveMath:5dd81d4c8c67e798ac64d0c4f711041c-us10"
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode===200) {
            res.sendFile(__dirname + "/success.html")           
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

});

app.post("/failure.html", (req,res)=>{
    res.redirect("/")
})




app.listen(4000, ()=>{console.log("Server is listening on port 4000");});

//5dd81d4c8c67e798ac64d0c4f711041c-us10
//5dd81d4c8c67e798ac64d0c4f711041c-us10
// 3a7c6f594c.