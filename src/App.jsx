import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import ListComponent from "./components/ListComponent";
import TotalHourComponent from "./components/TotalHourComponent";
import axios from "axios";

function App() {
  const [totalHour, setTotalHour] = useState(0);
  const [goodHour, setGoodHour] = useState(0);
  const [badhour, setBadHour] = useState(0);

  const [tasks, setTasks] = useState([]);

  const handleOnDelete = async (id) => {
    let response = await axios.delete(
      "http://localhost:3001/api/v1/tasks/" + id
    );

    if (response.data.status) {
      let updatedTasks = tasks.filter((item) => item._id != id);
      setTasks(updatedTasks);
      calculateTotalHours(updatedTasks);
    }
  };

  const handleOnSwap = async (id) => {
    let updatedTasks = [...tasks];
    let taskObj = updatedTasks.find((item) => item._id == id);

    taskObj.type = taskObj.type == "good" ? "bad" : "good";

    let response = await axios.patch(
      "http://localhost:3001/api/v1/tasks/" + id,
      {
        type: taskObj.type,
      }
    );

    if (response.data.status) {
      setTasks(updatedTasks);
      calculateTotalHours(updatedTasks);
    }
  };

  const handleOnAdd = async (taskObj) => {
    // get old task lists
    let newTaskList = [...tasks];

    // Create an api call
    let response = await axios.post(
      "http://localhost:3001/api/v1/tasks",
      taskObj
    );

    if (response.data.status) {
      // update taskObj id
      taskObj._id = response.data.task._id;
      // update old task lists and generate new task lists
      newTaskList.push(taskObj);

      // update the tasks
      setTasks(newTaskList);
      calculateTotalHours(newTaskList);
    }
  };

  const calculateTotalHours = (tempTaskList) => {
    let totalHour = tempTaskList.reduce(
      (acc, item) => parseInt(item.hour) + acc,
      0
    );

    let badHour = tempTaskList.reduce((acc, item) => {
      return acc + (item.type == "bad" ? parseInt(item.hour) : 0);
    }, 0);

    let goodHour = tempTaskList.reduce((acc, item) => {
      return acc + (item.type == "good" ? parseInt(item.hour) : 0);
    }, 0);

    setTotalHour(totalHour);
    setBadHour(badHour);
    setGoodHour(goodHour);
  };

  const fetchTasks = async () => {
    let response = await axios.get("http://localhost:3001/api/v1/tasks");

    setTasks(response.data.tasks);
    calculateTotalHours(response.data.tasks);
  };

  const handleOnDeleteAll = async (idsToDelete) => {
    console.log(idsToDelete);

    let response = await axios.delete("http://localhost:3001/api/v1/tasks", {
      data: {
        ids: idsToDelete,
      },
    });

    if (response.data.status) {
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="wrapper text-white">
        <div className="container text-center">
          {/* Header */}
          <Header title="Not To Do List" />

          {/* Add Task Form */}
          <AddTaskForm handleOnAdd={handleOnAdd} />

          {/* Task List */}
          <ListComponent
            tasks={tasks}
            handleOnDelete={handleOnDelete}
            handleOnSwap={handleOnSwap}
            goodHour={goodHour}
            badHour={badhour}
            handleOnDeleteAll={handleOnDeleteAll}
          />

          {/* Total Hours */}
          <TotalHourComponent totalHour={totalHour} />
        </div>
      </div>
    </>
  );
}

export default App;
