const express = require("express")
const pool = require("../configues/db")
const router = express.Router()

const { body, validationResult } = require('express-validator');

router.post("",body('first_name').isLength({ min: 1 }).withMessage("firstName is required"),
      body('last_name').isLength({ min: 1 }).withMessage("lastName is required")
, async(req, res) => {
    const {first_name,last_name} = req.body
    const errors = validationResult(req);
    
    
   if(!errors.isEmpty()){
    return res.status(500).json({ errors: errors.array() });
   
   }
    const users = await pool.query('INSERT INTO users (first_name,last_name) VALUES ($1,$2)', [first_name,last_name])
    return res.status(201).json(users)
   
    
   
    

  })
  router.get("",async(req, res) => {
    // const {first_name,last_name} = req.body
    try{
   const users = await pool.query('select * from users')
      return res.status(201).json(users.rows)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  })

  router.get("",async(req, res) => {
    const {id} = req.params
    try{
  
   const user = await pool.query('select * from users WHERE id = $1', [id])
      return res.status(201).json(user.rows)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  })

  router.put("",async(req, res) => {
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
    
  })
  
  router.delete("",async (req, res) => {
    const {id} = req.params
  try{
   const user = await pool.query('DELETE FROM users WHERE id = $1', [id])
     return res.status(200).json(`user is deleted with id ${id}`)
    }catch(e){
      return res.status(500).send("Something went wrong")
    }
  })
  module.exports = router
  // module.exports = {getUsers,getUsersById,updateUser,deleteUser}
  