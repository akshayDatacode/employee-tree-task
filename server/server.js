const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Router = require("./routes/employeeRoutes")
const mongo = require('./configs/dbConfig')
const app = express()

const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(Router);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
