import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";

//context
import { useTodoList } from "../../context/todolist";

function TaskItem(props) {
  const { todoListData, setTodoListData } = useTodoList();
  const { active } = props;
  const { task } = props;
  const { id, content, finished, finishedTime } = task;

  const [show, setShow] = useState(false);
  const [pastTime, setPastTime] = useState("");

  useEffect(() => {}, [todoListData]);

  //移除提醒視窗
  const handleDelete = () => {
    Swal.fire({
      title: `確認移除待辦事項：${content}`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      reverseButtons: true,
      buttonsStyling: false,
      focusCancel: false,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        //移除Task、更新localStorage的value
        let setTodoList = todoListData.filter((item) => item.id !== id);
        setTodoListData([...setTodoList]);
        localStorage.setItem("todoList", JSON.stringify(setTodoList));
      } else {
        setShow(false);
      }
    });
  };

  //完成待辦事項提醒視窗
  const handleFinished = () => {
    Swal.fire({
      title: `確認完成待辦事項：${content}`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      reverseButtons: true,
      buttonsStyling: false,
      focusCancel: false,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        //找到相同id物件的index
        const index = todoListData.findIndex((item, i) => item.id === id);
        //產生一個新的陣列
        const newTodoListData = [...todoListData];
        //更新finished狀態到物件中
        newTodoListData[index].finished = true;
        //更新完成時間到物件中
        newTodoListData[index].finishedTime = Date.now();

        //將更新後的陣列傳回todoListData
        setTodoListData(newTodoListData);

        //將更新後的todoListData傳回localStorage
        localStorage.setItem("todoList", JSON.stringify(newTodoListData));
      } else {
        setShow(false);
      }
    });
  };

  //計算已完成事項時間
  useEffect(() => {
    let seconds = Math.floor((Date.now() - finishedTime) / 1000);

    if (seconds < 60) {
      setPastTime(seconds + "秒前");
    } else if (seconds >= 60 && seconds < 3600) {
      setPastTime(Math.floor(seconds / 60) + "分鐘前");
    } else if (seconds >= 3600 && seconds < 86400) {
      setPastTime(Math.floor(seconds / 3600) + "小時前");
    } else {
      //超過一天則換算成 YYYY-MM-DD
      let now = new Date(finishedTime);
      //獲取年份
      let year = now.getFullYear();
      //獲取月份
      let month = now.getMonth()+1;
      //獲取日期
      let date = now.getDate();

      setPastTime(year + "-" + month + "-" + date);
    }
  }, []);

  return (
    <>
      {active === "待完成" ? (
        <>
          <div className="unFinishedTaskItem">
            <div className="taskItemInput">{content}</div>
            <button className="removeBtn" onClick={() => handleDelete()}>
              移除
            </button>
            <button className="finishedBtn" onClick={() => handleFinished()}>
              完成
            </button>
          </div>
          <hr />
        </>
      ) : (
        <>
          <div className="finishedTaskItem">
            <div className="taskItemInput">{content}</div>
            <div className="finishedTime">{pastTime}</div>
          </div>
          <hr />
        </>
      )}
    </>
  );
}

export default TaskItem;
