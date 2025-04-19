import { tasksContext } from "../Contexts/TasksContext";
import { useContext, useState } from "react";

export default function Task({ task }) {
  let [upInput, setUpInput] = useState("");

  let { tasks, setTasks } = useContext(tasksContext);

  function handleDone() {
    let tasksCopy = tasks.map((t) => {
      if (t.id == task.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTasks(tasksCopy);
    localStorage.setItem('tasks', JSON.stringify(tasksCopy))
  }

  function handleDelete() {
    setTasks(tasks.filter((t) => t.id !== task.id));
  }

  function handleUpdate() {
    let tasksCopy = tasks.map((t) => {
      if (t.id == task.id) {
        t.isUpdated = true;
        setUpInput(t.title);
        console.log(t);
      }
      return t;
    });
    setTasks(tasksCopy);
  }

  function handleInput(event) {
    setUpInput(event.target.value);
  }

  function finishUpdate() {
    let tasksCopy = tasks.map((t) => {
      if (t.id == task.id) {
        t.title = upInput;
        t.isUpdated = false;
      }
      return t;
    });
    setTasks(tasksCopy);
  }

  return (
    <div
      id="task"
      className="flex p-1 justify-between rounded-lg bg-blue-300 mt-2"
    >
      {task.isUpdated ? (
        <button
          onClick={finishUpdate}
          className="me-2 bg-blue-400 p-1 px-2 rounded-2xl"
        >
          تعديل
        </button>
      ) : (
        <div id="icons" className=" flex w-[25%] justify-between text-center">
          <button
            className="delete border rounded-[50%] w-8"
            onClick={() => {
              handleDelete();
            }}
          >
            D
          </button>

          <button
            onClick={handleUpdate}
            className="update border rounded-[50%] w-8"
          >
            U
          </button>

          <button
            style={{ backgroundColor: task.isDone ? "green" : "" }}
            className="done border rounded-[50%] w-8"
            onClick={() => {
              handleDone();
            }}
          >
            N
          </button>
        </div>
      )}

      <div className="taskDes">
        {task.isUpdated ? (
          <input
            className=" text-end bg-blue-600 rounded-lg p-1 text-white"
            value={upInput}
            onChange={handleInput}
          />
        ) : (
          <h3 className=" text-end" style={{ textDecorationLine:task.isDone?'line-through': 'none'}}>{task.title}</h3>
        )}
      </div>
    </div>
  );
}
