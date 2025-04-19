import React, { useState, useEffect } from "react";
import Task from "./Task";
import { tasksContext } from "../Contexts/TasksContext";
import { useContext } from "react";

import { TabItem, Tabs } from "flowbite-react";

export default function TodoComp() {
  const { tasks, setTasks } = useContext(tasksContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    const tasksCopy = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(tasksCopy);
  }, []);

  const tasksList = tasks.map((t) => {
    return <Task key={t.id} task={t} />;
  });

  const completedTasks = tasks.filter((t) => t.isDone);
  const completedTasksList = completedTasks.map((t) => {
    return <Task key={t.id} task={t} />;
  });

  const nonCompletedTasks = tasks.filter((t) => !t.isDone);
  const nonCompletedTasksList = nonCompletedTasks.map((t) => {
    return <Task key={t.id} task={t} />;
  });

  function handleAdd(event) {
    setInput(event.target.value);
  }

  function handleClick() {
    const tasksCopy = [
      ...tasks,
      { id: tasks.length + 1, title: input, isDone: false },
    ];
    setTasks(tasksCopy),
      localStorage.setItem("tasks", JSON.stringify(tasksCopy));
    setInput("");
  }

  // function handleDelete(id){
  //     const tasksCopy=tasks.filter((t)=>{return t.id != id})
  //     setTasks(tasksCopy)
  //     console.log(tasks);
  // }

  // filter is return new array , not edit old array
  // function handleDelete(id){
  //     const tasksCopy= [...tasks]
  //     tasksCopy.filter((t)=>{return t.id != id})
  //     setTasks(tasksCopy)
  //     console.log(...tasks);
  // }

  return (
    <>
      <div className="main bg-black h-[100vh] w-[100vw] flex">
        <div className="todoBox w-[40%] h-[80%] m-auto bg-amber-50 text-black rounded-2xl p-2 relative  ">
          <h1 className=" text-5xl font-bold my-2 text-center">مهامي</h1>
          <hr className="w-[80%] mx-auto" />

          {/* <div className="taskState flex justify-center my-3">
            <div className=" border border-red-300 p-2 rounded-lg text-lg">
              <p>منجز</p>
            </div>
            <div className=" border border-red-300 p-2 rounded-lg text-lg">
              <p>غير منجز </p>
            </div>
            <div className=" border border-red-300 p-2 rounded-lg text-lg">
              <p>الكل</p>
            </div>
          </div> */}



          <div className="taskState flex justify-center my-3 w-[100] ">
            <Tabs
              className="w-full justify-center"
              aria-label="Pills"
              variant="pills"
            >
              <TabItem title="منجز">
                <div>{completedTasksList}</div>
              </TabItem>

              <TabItem title=" غير منجز ">
                <div>{nonCompletedTasksList}</div>
              </TabItem>

              <TabItem title=" الكل " active>
                <div>{tasksList}</div>
              </TabItem>
            </Tabs>
          </div>

          {/* <div className="tasks mt-2">{completedTasksList}</div> */}

          <div className="add absolute bottom-2 w-[100%]">
            <button
              style={{ backgroundColor: "red" }}
              onClick={handleClick}
              className=" px-4 py-3 rounded-xl text-white"
              disabled={input <= 0}
            >
              إضافة
            </button>

            <input
              value={input}
              onChange={handleAdd}
              className=" border p-3 border-red-400 rounded-lg w-[70%]"
              type="text"
              placeholder="عنوان المهمة"
            />
          </div>
        </div>
      </div>
    </>
  );
}
