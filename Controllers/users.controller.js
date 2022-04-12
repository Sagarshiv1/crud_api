const express = require("express")
const pool = require("../configues/db")
const createUser = async(req, res) => {
    const {first_name,last_name} = req.body
    try{
  
   const user = await pool.query('INSERT INTO users (first_name,last_name) VALUES ($1,$2)', [first_name,last_name])
      return res.status(201).send(user)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }

  }
  const getUsers = async(req, res) => {
    // const {first_name,last_name} = req.body
    try{
   const users = await pool.query('select * from users')
      return res.status(201).json(users.rows)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  }

  const getUsersById = async(req, res) => {
    const {id} = req.params
    try{
  
   const user = await pool.query('select * from users WHERE id = $1', [id])
      return res.status(201).json(user.rows)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  }

  const updateUser = async(req, res) => {
    const {id} = req.params
    const {first_name,last_name } = req.body
      try{
   const user = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3',
      [first_name,last_name, id])
       return res.status(200).json(`user is updated with id ${id}`)
      }catch(e){
        return res.status(500).send("Something went wrong")
      }
    
  }
  
  const deleteUser = async (req, res) => {
    const {id} = req.params
  try{
   const user = await pool.query('DELETE FROM users WHERE id = $1', [id])
     return res.status(200).json(`user is deleted with id ${id}`)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  }
  module.exports = {createUser,getUsers,getUsersById,updateUser,deleteUser}