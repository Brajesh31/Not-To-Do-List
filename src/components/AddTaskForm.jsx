import React, { useState } from "react";

const AddTaskForm = ({ handleOnAdd }) => {
  const generateUniqueId = () => {
    let stringGenerator =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let stringLength = 6;
    let stringValue = "";

    for (let i = 0; i < stringLength; i++) {
      let randomIndex = Math.floor(Math.random() * stringGenerator.length);
      stringValue += stringGenerator[randomIndex];
    }

    return stringValue;
  };

  const [taskObj, setTaskObj] = useState({
    task: "",
    hour: 0,
    type: "good",
  });

  const handleOnClick = () => {
    // alert("Add Task Clicked");

    //get new task list
    let newTask = {
      ...taskObj,
      id: generateUniqueId(),
    };

    handleOnAdd(newTask);
  };
  return (
    <div className="row p-4 mb-5 rounded shadow-lg bg-white">
      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control"
          id="task"
          name="task"
          placeholder="ADD TASK"
          value={taskObj.task}
          onChange={(e) => {
            let newTaskObj = {
              ...taskObj,
              task: e.target.value,
            };

            setTaskObj(newTaskObj);
          }}
        />
      </div>
      <div className="col-12 col-md-3 col-lg-2">
        <input
          type="number"
          className="form-control"
          id="hour"
          name="hour"
          placeholder="ENTER HOUR"
          value={taskObj.hour}
          onChange={(e) => {
            let newTaskObj = {
              ...taskObj,
              hour: e.target.value,
            };

            setTaskObj(newTaskObj);
          }}
        />
      </div>
      <div className="col-12 col-md-3 col-lg-2">
        <select
          className="form-select"
          name="type"
          id="type"
          value={taskObj.type}
          onChange={(e) => {
            let newTaskObj = {
              ...taskObj,
              type: e.target.value,
            };

            setTaskObj(newTaskObj);
          }}
        >
          <option value="good">Good</option>
          <option value="bad">Bad</option>
        </select>
      </div>
      <div className="col-12 col-md-2">
        <button
          type="button"
          className="btn btn-primary w-100"
          id="addBtn"
          onClick={handleOnClick}
        >
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
