const express = require("express")
const client = require("./configues/db")

const app = express()
const {createUser,getUsers,getUsersById,updateUser,deleteUser} = require("./Controllers/users.controller")
app.use(express.json())
app.post("/users",createUser)
app.get("/users",getUsers)
app.get("/user/:id",getUsersById)
app.put("/user/:id",updateUser)
app.delete("/users/:id",deleteUser)
app.listen(2345,() =>{
    console.log("succesfully connected")
})

client.connect()







