import React ,{useState}from 'react'

const Input = () => {
    const [description,setDescription] =useState('')
  
    const handleSumbit = async(e) =>{
        e.preventDefault();
          try{
            const body ={description}
            const respones =await fetch("http://localhost:3000/add",{
               method:"POST",
               headers :{"Content-Type":"application/json"},
               body :JSON.stringify(body)
            });

            window.location = "/";

          }catch(err){
           console.log(err)
          }
        
       }
  return (
    <div>
        <h1 className='text-center mt-5' style={{"fontSize":"32px","fontWeight":"700"}}>Todo App</h1>

    <form className='d-flex mt-5' onSubmit={handleSumbit}>
      <input type='text'  style={{"width":"500px","marginLeft":"400px"}}
      placeholder='Add Comment ....'
      value={description}
       onChange={(e)=>setDescription(e.target.value)}  />
       <button className='btn btn-primary'  style={{"marginLeft":"20px","width":"100px"}}>Add</button>  
    </form></div>
  )
}

export default Input