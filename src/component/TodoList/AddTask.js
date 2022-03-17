import React, { useState } from "react";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";

//context
import { useTodoList } from "../../context/todolist";

function AddTask() {
  const { todoListData, setTodoListData } = useTodoList();
  const [validated, setValidated] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  // const [finished, setFinished] = useState(false);

  //新增待辦事項
  const addTask = () => {
    if (newTaskContent!=="") {
      //加入待辦事項alert
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "已新增待辦事項",
        customClass: {
          popup: "c-alert__toast",
          title: "c-alert__subtitle",
        },
      });

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
          <Button className="taskInputBtn" type="submit" onClick={addTask}>
            送出
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddTask;
