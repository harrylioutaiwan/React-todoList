import React, { useState } from "react";
import { Form, Button,Spinner } from "react-bootstrap";

//context
import { useTodoList } from "../../context/todolist";

function AddTask() {
  const { todoListData, setTodoListData } = useTodoList();
  const [validated, setValidated] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleChange = (e) => {
    setNewTaskContent(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    //新增待辦事項
    if (newTaskContent!=="") {
      const newTask = {
        id: Date.now(),
        content: newTaskContent,
        finished: false,
        finishedTime: "",
      };

      const newTodoListData = [...todoListData, newTask];

      if (todoListData.length !== 0) {
        setTodoListData(newTodoListData);
        localStorage.setItem("todoList", JSON.stringify(newTodoListData));
      } else {
        setTodoListData([newTask]);
        localStorage.setItem("todoList", JSON.stringify([newTask]));
      }
    }
  };

  return (
    <>
      <div className="inputGroup">
        <div className="heading">
          <h1>待辦事項</h1>
        </div>
        <div className="inputLabel">
          <span className="icon">*</span>
          <span>項目</span>
        </div>
        <Form
          className="taskForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="taskInput" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="請輸入待辦事項"
              value={newTaskContent}
              onChange={handleChange}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              尚未填寫待辦事項
            </Form.Control.Feedback>
          </Form.Group>
            <Button className="taskInputBtn" type="submit">
            送出
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddTask;
