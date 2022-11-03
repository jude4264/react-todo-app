import React from 'react'

export default function Li({id,title,completed,todoData,setTodoData,provided,snapshot}) {

    const handleClick = (id) => {
        console.log(todoData);
        let newTodoData = todoData.filter((data) =>  id !== id)
        setTodoData(newTodoData)
    }

    const handleCompleteChange = (id) => {
        let newTodo = todoData.map((data => {
            if ( id === id) {
                 completed = ! completed;
            }
            return data;
        }));

        setTodoData(newTodo)
    }
  return (  
  <div key={id}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
    <div className='items-center'>
        <input type="checkbox"
            defaultChecked={false}
            onChange={() => handleCompleteChange(id)}
            className="mr-2"
        />
        <span className={completed ? 'line-through' : undefined}>{ title}</span>
    </div>
    <div className='items-center'>
        <button className='px-4 py-2 float-right' onClick={() => handleClick( id)}>x</button>
    </div>
</div>
  )
}
