const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const ejs = require('ejs');
const { text } = require("body-parser");

const app = express();

app.set('view engine', 'ejs');  //to use EJS
app.use(bodyParser.urlencoded({ extended: true })); //To transfer data on post request
app.use(express.static("public")); //parse static files like css 


app.get("/", function (req, res) {

    res.render("home", {})
})

let lookupCode = {};

app.post("/", function (req, res) {

    lookupCode = req.body.lookupCode;

    res.redirect(`${lookupCode}`)
})


app.get(/${lookupcode}, function (req, res) {
    const requestedIfsc = req.params.postURL;

console.log(lookupCode)

let url = "https://ifsc.razorpay.com/" + requestedIfsc


https.get(url, function (response) {

    if (response.statusCode === 404) {
        res.render("error")
    }


    response.on("data", function (data) {
        const ifscInfo = JSON.parse(data);

        const ifscCode = ifscInfo.IFSC



        const service = ["UPI", "RTGS", "IMPS", "NEFT"];

        let trueServices = [];

        for (let i = 0; i < service.length; i++) {
            console.log(i)

            if (ifscInfo[service[i]] === true) {
                console.log([service[i]])
                trueServices.push[service[i]]
            }
        }


        console.log(trueServices)




        res.render("result", {
            ifscCode: ifscCode,
            bankName: ifscInfo.BANK,
            micrCode: ifscInfo.MICR,
            bankBranch: ifscInfo.BRANCH,
            bankCity: ifscInfo.CITY,
            bankAddress: ifscInfo.ADDRESS,
            bankDist: ifscInfo.DISTRICT,
            bankState: ifscInfo.STATE,
            bankService: trueServices
        })

    })
})


})

app.listen(3000, function () {
    console.log("Server started on port 3000")
})