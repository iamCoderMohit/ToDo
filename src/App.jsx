import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import Navbar from './components/Navbar'
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params)=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e)=> {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=> {
    let t = todos.filter(i=> i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id!==id
     });
     setTodos(newTodos)
     saveToLS()
  }
  const handleDelete = (e, id)=> {
     let newTodos = todos.filter(item => {
      return item.id!==id
     });
     setTodos(newTodos)
     saveToLS()
  }
  const handleAdd = ()=> {
    setTodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=> {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
     let id = e.target.name;
     let index = todos.findIndex(item => {
      return item.id === id
     })

     let newTodos = [...todos];
     newTodos[index].isCompleted = !newTodos[index].isCompleted;
     setTodos(newTodos)
     saveToLS()

     }

  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto bg-gray-300 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-3xl'>iTask - manage all your tasks at one place</h1>
      <div className="addTodo my-4  flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add a todo</h2>

        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" placeholder='type your task here' className='w-full rounded-lg p-2 border-gray-900'/>
        <button onClick={handleAdd} disabled={todo.length<3} className='bg-gray-900 disabled:bg-gray-600 text-md text-white p-6 py-1 rounded-lg font-bold mx-2'>Add</button>
      </div>
      </div>
     
      <input onChange={toggleFinished} type="checkbox" name="" id="" checked={showFinished}/> Show Finished

        <h2 className='text-lg font-bold'>Your Todos</h2>
     
    <div className="todos">

    {todos.length===0 && <div className='m-5'>No ToDos to display. Add one now</div> }

      {todos.map(item=> {

    
      return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
        <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=> {handleEdit(e, item.id)}} className='bg-gray-900 text-md text-white p-3 py-1 rounded-lg font-bold mx-2'><FaEdit /></button>
            <button onClick={(e)=> {handleDelete(e, item.id)}} className='bg-gray-900 text-md text-white p-3 py-1 rounded-lg font-bold mx-2'><MdDelete /></button>
          </div>
      </div>
        })}
    </div>

    </div>
    </>
  )
}

export default App
