const express = require("express")
const client = require("./configues/db")

const app = express()
const createUser = require("./Controllers/users.controller")
const getUsers = require("./Controllers/users.controller")
const getUsersById = require("./Controllers/users.controller")
const updateUser = require("./Controllers/users.controller")
const deleteUser = require("./Controllers/users.controller")
// const {getUsers,getUsersById,updateUser,deleteUser} = require("./Controllers/users.controller")
app.use(express.json())
app.use("/users",createUser)
app.use("/users",getUsers)
app.use("/users/:id",getUsersById)
app.use("/user/:id",updateUser)
app.delete("/users/:id",deleteUser)
app.listen(2345,() =>{
    console.log("succesfully connected")
})

client.connect()







