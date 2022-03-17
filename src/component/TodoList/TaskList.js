import { React, useState, useEffect } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";

//context
import { useTodoList } from "../../context/todolist";

//styled-component
const Tab = styled.button`
  font-size: 1rem;
  border: 1px solid #bdbdbd;
  background: none;
  text-align: center;
  width: 50%;
  height: 3rem;
  ${({ active }) =>
    active &&
    `
    background: #bdbdbd;
  `}
`;
const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`;

function TaskList(props) {
  const { todoListData, setTodoListData } = useTodoList();

  //tabs
  const types = ["待完成", "已完成"];
  const [active, setActive] = useState(types[0]);

  //篩選出未完成事項
  let unFinishedTodoList = todoListData.filter(
    (item) => item.finished === false
  );

  //篩選出已完成事項
  let finishedTodoList = todoListData.filter((item) => item.finished !== false);

  useEffect(() => {}, [todoListData]);

  return (
    <>
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <div className="taskList">
        {active === types[0]
          ? unFinishedTodoList.map((task, i) => {
              return <TaskItem key={task.id} task={task} active={active} />;
            })
          : finishedTodoList.map((task, i) => {
              return <TaskItem key={task.id} task={task} active={active} />;
            })}
      </div>
    </>
  );
}

export default TaskList;
