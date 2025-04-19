import "./App.css";
import TodoComp from "./Components/TodoComp";
import { tasksContext } from "./Contexts/TasksContext";
import { useState } from "react";

function App() {


    const [tasks, setTasks] = useState([
      { id: 1, title: "ورد القرآن", details: "قراءة خمس أوجه يومياً", isDone: false ,isUpdated: false },
      { id: 2, title: "صلاة القيام", details: "المحافظة عليها قبل صلاة الفجر", isDone: false, isUpdated: false },
    ]);



  return (
    <>     
      <tasksContext.Provider value={{tasks, setTasks}}>
        <TodoComp />
      </tasksContext.Provider>
    </>
  );
}

export default App;
