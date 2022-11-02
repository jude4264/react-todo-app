import React , {useState} from "react";
import "./App.css"

// export default class App extends Component {
export default function App() {

  // state ={
  //   todoData : [
  //     // {
  //     //   id: "1",
  //     //   title:"공부하기",
  //     //   completed: true
  //     // },
  //     // {
  //     //   id: "2",
  //     //   title:"청소하기",
  //     //   completed: false
  //     // }
  //   ],
  //   value : ""
  // }

  const [todoData, setTodoData] = useState([])
  const [value, setValue] = useState([])

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursur: "pointer",
    float: "right"
  }

  const getStyle = (completed) => {
    // console.log(completed);
    // console.log(completed? "line-through" : "none",);
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      // "text-decoration": completed? "line-through" : "none"
      textDecoration: completed? "line-through" : "none"
    };
  }

  const handleClick = (id) =>{
    // let newTodoData = this.state.todoData.filter((data)=>data.id!==id)
    let newTodoData = todoData.filter((data)=>data.id!==id)
    // console.log('newTodoData', newTodoData);
    // this.setState({todoData : newTodoData});
    setTodoData(newTodoData)
  }

  const handleChange=(e)=>{
    // console.log('e',e.target.value);
    // this.setState({value: e.target.value})
    setValue(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault(); //페이지 리로드 막아줌 
    //새로운 할일 데이터 
    let newTodo = {
      id : Date.now(),
      // title : this.state.value,
      title : value,
      completed : false
    };
    // this.setState({todoData: [...this.state.todoData,newTodo], value: "" })
    // this.setState({todoData: [...todoData,newTodo], value: "" })
    setTodoData((prev)=>[...prev, newTodo])
    setValue("")

  }

  const handleCompleteChange=(id)=>{
    // let newTodo = this.state.todoData.map((data=>{
    let newTodo = todoData.map((data=>{
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    }));
    // this.setState({todoData : newTodo });
    setTodoData(newTodo)
  }


  // render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {/* {this.state.todoData.map((data) => ( */}
          {todoData.map((data) => (
            // console.log(data);
            // <div style={this.getStyle(data.completed)} key={data.id}>
            <div style={getStyle(data.completed)} key={data.id}>
              <input type="checkbox" 
              defaultChecked={false} 
              // onChange={()=>this.handleCompleteChange(data.id)}
              onChange={()=>handleCompleteChange(data.id)}
              />
              {data.title}
              {/* <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button> */}
              <button style={btnStyle} onClick={()=>handleClick(data.id)}>x</button>
            </div>
          ))}

          {/* <form style={{display: 'flex'}} onSubmit={this.handleSubmit}> */}
          <form style={{display: 'flex'}} onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="value" 
            style={{flex : '10', padding: '5px'}}
            placeholder="해야 할 일을 입력하세요."
            // value={this.state.value}
            value={value}
            onChange={handleChange}
            // onChange={this.handleChange}
            />
            <input
            type="submit"
            value="입력"
            className="btn"
            style={{flex : '1'}}
            />
          </form>
        </div>
      </div>
    )
  // }
}
