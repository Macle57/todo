import './index.css'
import quote from './assets/frog.png'

import {useEffect, useRef, useState} from "react";
import "framer-motion"
import {Reorder} from "framer-motion";

import {Form} from "./Form.tsx";
import {TodoObj} from "./TodoObj.tsx";
import {TaskLine} from "./TaskLine.tsx";


function App() {

    const [todo, setTodo] = useState<TodoObj[]>(fetchTodo);
    const [val, setVal] = useState('');
    const enableDelete = useRef(false);

    useEffect(() => {
        if (todo.length === 0) {
            localStorage.removeItem("ToDoList");
        } else {
            localStorage.setItem("ToDoList", JSON.stringify(todo));
        }
    }, [todo])

    function fetchTodo() {
        return JSON.parse(localStorage.getItem("ToDoList") ?? "[]")
    }

    function handleDelete(delID: number) {
        if (enableDelete.current) {
            setTodo(prevState => prevState.filter(({id}) => id !== delID));
        }
    }

    function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setVal(prevVal => {
            setTodo((prevToDo) => {
                return [...prevToDo, {id: prevToDo.length, text: prevVal, checked: false}]
            })
            return '';
        })
    }

    function setIdChecked(id: number, checkedTo: boolean) {
        return () => {
            setTodo(prevState => prevState.map((todoLine) => {
                    if (id === todoLine.id) {
                        todoLine.checked = checkedTo
                    }
                    return todoLine;
                })
            )
        }
    }

    return (
        <>
            <span draggable>To Do:</span>
            <img src={quote} alt='Motivational Quote'/>
            <div className='todoWrapper -bottom-1.5'>
                <Reorder.Group onReorder={setTodo} values={todo}>
                    {todo.map((todoLine) =>
                        <TaskLine key={todoLine.id} line={todoLine}
                                  onChange={setIdChecked(todoLine.id, !todoLine.checked)} handleDelete={handleDelete}
                                  enableDelete={enableDelete}/>
                    )}
                </Reorder.Group>
            </div>
            <div className='dropDelete' onMouseEnter={() => {
                enableDelete.current = true;
            }} onMouseLeave={() => {
                enableDelete.current = false
            }}>
                🗑️
            </div>
            <Form onSubmit={onSubmit} value={val} onChange={(e: any) => {
                setVal(e.target.value);
            }}
            />
        </>
    )
}

export default App