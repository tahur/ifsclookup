const express = require("express");
const BodyParser = require("body-parser");
const https = require('https');

const app = express();


let ifscode = "SBIN0002130"


let url = "https://ifsc.razorpay.com/" + ifscode

let bankName =;


https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
        const ifscInfo = JSON.parse(data);

        console.log(ifscInfo)






    })
})


app.get("/", function (req, res) {

    res.send("hello")




})


app.post("/", function (req, res) {

})

app.listen(3000, function () {
    console.log("Server started on port 3000")
})