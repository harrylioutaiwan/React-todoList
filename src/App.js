import React, { useState, useEffect } from "react";
import TodoList from "./component/TodoList/TodoList";

import { todoListContext } from "./context/todolist";

import "./App.scss";

function App() {
  const [todoListData, setTodoListData] = useState([]);
  useEffect(() => {
    //初始化localStorage購物車
    const todoList = localStorage.getItem("todoList");
    if (todoList) {
      const todoList = JSON.parse(localStorage.getItem("todoList"));
      setTodoListData([...todoListData, ...todoList]);
    } else {
      localStorage.setItem("todoList", "");
    }
  }, []);
  return (
    <>
      <todoListContext.Provider value={{ todoListData, setTodoListData }}>
        <TodoList />
      </todoListContext.Provider>
    </>
  );
}

export default App;
