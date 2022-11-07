import React , {useCallback, useState} from "react";
import "./App.css"
import Form from "./components/Form";
import List from "./components/List";
  
const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
 console.log("App component");
 console.log(initialTodoData);
 console.log("App component");
  const [todoData, setTodoData] = useState(initialTodoData)
  const [value, setValue] = useState([])

  const handleClick = useCallback((id) => {
    console.log(todoData);
    let newTodoData = todoData.filter((data) => data.id !== id)
    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }, [todoData])

  const handleSubmit=(e)=>{
    e.preventDefault(); //페이지 리로드 막아줌 
    //새로운 할일 데이터 
    let newTodo = {
      id : Date.now(),
      title : value,
      completed : false
    };
    setTodoData((prev)=>[...prev, newTodo])
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]))
    const test = localStorage.getItem("todoData")
    console.log(JSON.parse(test));
    setValue("")
  }

  const handleRemveCick =()=>{
    setTodoData([])
    localStorage.setItem('todoData', JSON.stringify([]))
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemveCick}>Delete All</button>
        </div>
        <List handleClick = {handleClick} todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />

      </div>
    </div>
  )
}
