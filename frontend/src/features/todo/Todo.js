import React, {useState, useEffect} from "react";
import { apiGetTodos, apiAddTodo, apiCompleteTodo, apiDeleteTodo } from "./todoSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Todo.css";

export function ToDo({userToken}) {
    const todoList = useSelector((state) => state.todo.todoList)
    const initDone = useSelector((state) => state.todo.initLoad)
    const statusMessage = useSelector((state) => state.todo.statusMessage)

    const dispatch = useDispatch()
    const [todo, setTodo] = useState("")

    const add = (e) => {
        e.preventDefault()
        dispatch(apiAddTodo({ token: userToken, todo: todo }))
        .then(() => {
            dispatch(apiGetTodos(userToken))
            setTodo("")
        })
      }

      const complete = (e) => {
        e.preventDefault()
        dispatch(apiCompleteTodo({ token: userToken, todoId: e.target.id }))
        .then(() => {
            dispatch(apiGetTodos(userToken))
        })
      }

      const deleteFun = (e) => {
        e.preventDefault()
        dispatch(apiDeleteTodo({ token: userToken, todoId: e.target.id }))
        .then(() => {
            dispatch(apiGetTodos(userToken))
        })
      }

    useEffect(() => {
        if (!initDone) {
            dispatch(apiGetTodos(userToken))
        }
    }, [initDone, userToken, dispatch])

    const dotos = todoList.map((element) => {
        let el = 
            <div className="todo" key={element.id}>
                <div>{element.content}</div>
                <div className="buttonContainer">
                    <button className="completeButton" id= {element.id} onClick={ (event) =>  complete(event) }>Zavrsi</button>
                    <button className="deleteButton" id= {element.id} onClick={ (event) =>  deleteFun(event) }>Obrisi</button>
                </div>
            </div>

        if(element.completed) {
            el = 
            <div className="todo" key={element.id}>
                <div className="completedTodo">{element.content} - line-through</div>
                <div className="buttonContainer">
                    <button className="deleteButton" id= {element.id} onClick={ (event) =>  deleteFun(event) }>Obrisi</button>
                </div>
            </div>
        }

        return el
    })

    let content = 
    <div className="todoContainer">
        <h2>Vasa ToDo lista: </h2>
        <div>
        <form className="todoForm">
            <input className="input todoInput" type="text" value={todo} onChange={(event) => setTodo(event.target.value)} />
            <button className="button" onClick={ (event) =>  add(event) }>Dodaj</button>
        </form>
        <br/>
        <p>{statusMessage}</p>
        { dotos }
        </div>
    </div>

    return (
    <React.Fragment>
        {content}
    </React.Fragment>)
}