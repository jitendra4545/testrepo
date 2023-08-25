
require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { connection } = require('./config/db')
const { UserModel } = require('./model/UserLoginModel')
const cors=require('cors')
app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
  try {
    let allData = await UserModel.find()
    res.send(allData)
  } catch (err) {
    res.send({ "msg": "somthing went wrong! cannot get data", "error": err.message })
  }
})


app.post("/adduser", async (req, res) => {
  let userData = req.body

  try {
    let newUser = new UserModel(userData)
    if (userData.name != "" && userData.email != "") {
      await newUser.save()
      jwt.sign({ jitendra: 'ghadei' }, userData.email, async function (err, token) {
        console.log(token);
        res.send({ "msg": "Login Successfull", "token": token })
      })

    } else {
      console.log({ "msg": "somthing went wrong! cannot generate token" })
    }
  } catch (err) {
    res.send({ "msg": "somthing went wrong! cannot add", "error": err.message })
  }
})


app.listen(process.env.port, async () => {
  try {
    await connection
    console.log('connected with db')
  } catch (err) {
    console.log('unable to connect mongodb')
  }
  console.log(`server running on port ${process.env.port}`)
})