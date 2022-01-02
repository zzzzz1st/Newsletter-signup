const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
  const fName = req.body.fName
  const lName = req.body.lName
  const email = req.body.email
  const url = "https://us20.api.mailchimp.com/3.0/lists/873769587c/members"
  const options = {
    method: "post",
    auth: "zzzzz1st:e3b872c9e754b49b8325c5d451247777-us20"
  }
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName
    }
  }
  const jsonData = JSON.stringify(data)
  const connection = https.request(url, options, (response) => {
    if (response.statusCode === 200)
      res.sendFile(__dirname + "/success.html")
    else
      res.sendFile(__dirname + "/failure.html")
    response.on("data", (data) => {
      console.log(JSON.parse(data))
    })
  })
  connection.write(jsonData)
  connection.end();
})

app.post("/failure", (req, res) => {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000")
})

// e3b872c9e754b49b8325c5d451247777-us20

// 873769587c