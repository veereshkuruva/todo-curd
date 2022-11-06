import React, { useState, useEffect } from 'react'
import EditTodo from './EditTodo'
const List = () => {
    const [state, setState] = useState([])
    const getallTodos = async () => {
        const response = await fetch("http://localhost:3000/getdata")
        const jsonData = await response.json()
        // console.log(jsonData)
        setState(jsonData)
    }
    useEffect(() => {
        getallTodos()
    }, [])
       //delete todo
       const deleteTodo =async(id)=>{

        try{
            const deletItem=fetch(`http://localhost:3000/delete/${id}`,{
                method:"DELETE"
               })
            //    console.log(deletItem)
            setState(state.filter(ele=>ele.todo_id!==id))
        }
        catch(err){
            console.log(err)
        }
         
       }
    return (
        <div>
            
                <table class="table mt-5 text-center">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                   {state.map(ele=>(
                    <tr key={ele.todo_id}>
                        <td>{ele.description}</td>
                        <td><EditTodo ele={ele}/></td>
                        <td><button className='btn btn-danger' onClick={()=>deleteTodo(ele.todo_id)}>Delete</button></td>
                    </tr>
                   ))}
                
                </tbody>
              </table>
        </div>
    )
}

export default List