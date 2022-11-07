

import { data } from 'autoprefixer';
import React, { useState } from 'react';

const li = React.memo(({ 
    handleClick,
    id, 
    title, 
    completed, 
    todoData, 
    setTodoData, 
    provided, 
    snapshot 
}) => {
    // console.log("li component");

   const [isEditing, setisEditing] = useState(false)
   const [editedTitle, setEditedTitle] = useState(title)

    const handleCompleteChange = (id) => {
        let newTodo = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });

        setTodoData(newTodo)
        localStorage.setItem('todoData', JSON.stringify(newTodo))
    }

    const handleEditChange = (event) =>{
        setEditedTitle(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        let newTodoData = todoData.map(data=>{
            if(data.id === id){
                data.title = editedTitle
            }
            return data
        })
        setTodoData(newTodoData)
        setisEditing(false)
        localStorage.setItem('todoData', JSON.stringify(newTodoData))

    }

    if (isEditing) {
        return (
            <div className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded`}>
                <div className='items-center'>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={editedTitle}
                            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                            onChange={handleEditChange}
                        />
                    </form>
                </div>
                <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
                    <button className='px-4 py-2 float-right' type='submit' onClick={handleSubmit}>save</button>
                </div>
            </div>
        )
    } else {
        return (
            <div key={id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
                <div className='items-center'>
                    <input
                        type="checkbox"
                        onChange={() => handleCompleteChange(id)}
                        defaultChecked={completed}
                    />
                    <span className={completed ? 'line-through' : undefined}>{title}</span>
                </div>
                <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
                    <button className='px-4 py-2 float-right' onClick={() => setisEditing(true)}>edit</button>
                </div>
            </div>
        )
    }
})

export default li



