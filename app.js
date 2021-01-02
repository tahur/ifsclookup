const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');  //to use EJS
app.use(bodyParser.urlencoded({ extended: true })); //To transfer data on post request
app.use(express.static("public")); //parse static files like css 

let ifscode = "SBIN0002130"







app.get("/", function (req, res) {

    res.render("home", {})




})


app.post("/", function (req, res) {

    const lookupCode = req.body.lookupCode;

    console.log(lookupCode)

    let url = "https://ifsc.razorpay.com/" + lookupCode


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const ifscInfo = JSON.parse(data);

            console.log(ifscInfo)

        })
    })


})

app.listen(3000, function () {
    console.log("Server started on port 3000")
})