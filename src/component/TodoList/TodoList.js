import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TodoList() {
  return (
    <>
      <div className="container">
        <AddTask />
        <TaskList />
      </div>
    </>
  );
}

export default TodoList;
