const express = require('express')
const app = express()
const port = 3000
const cors =require("cors")
const pool =require('./db')
const fs =require("fs")


//middlewares
app.use(cors())
app.use(express.json())

//ROUTES

//create todo 

app.post('/add',async(req,res)=>{
    const { description} =req.body;
    try{
        const newTodo =await pool.query("INSERT INTO todoappcome( description) VALUES($1) RETURNINg *"
        
        ,[description]
        )
       
        res.json(newTodo.rows[0]);
    

    } catch(err){
        console.log(err)
    }
});

//get all todo

app.get("/getdata",async(req,res)=>{
   
    try{
      const allTodos =await pool.query("SELECT * FROM todoappcome");
      res.json(allTodos.rows)
    }
    catch(err){
        console.log(err)
    }
})


//get a todo
   app.get("/todos/:id",async(req,res)=>{

      try{
        const {id} =req.params
        const todo=await pool.query("SELECT * FROM todoappcome WHERE todo_id=$1",[id])
   
       res.json(todo.rows[0]);
      }
      catch(err){
        console.log(err)
      }
    })

//upadte todo

app.put("/update/:id",async(req,res)=>{

    try{
         const {id} =req.params
        const {description} =req.body
        const updateTodo =await pool.query("UPDATE todoappcome SET description =$1 WHERE todo_id=$2",[description,id]);
        res.json("Todo is updated")

    } catch(err){

    }

  
})

//delete todo

app.delete("/delete/:id",async(req,res)=>{

    try{
         const {id} =req.params
       
        const deleteTodo =await pool.query("DELETE FROM todoappcome WHERE todo_id =$1 ",[id]);
        res.json("Todo is deleted")

    } catch(err){

    }

  
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//nodemon index --start the server