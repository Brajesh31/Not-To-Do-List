import React from "react";
import TaskList from "./TaskList";

const ListComponent = ({
  tasks,
  handleOnDelete,
  handleOnSwap,
  goodHour,
  badHour,
  handleOnDeleteAll,
}) => {
  // good list
  let goodTasks = tasks.filter((item) => item.type === "good");

  // bad list
  let badTasks = tasks.filter((item) => item.type === "bad");

  return (
    <div className="row mb-5">
      {/* Good List */}
      <TaskList
        title="Good List"
        tasks={goodTasks}
        handleOnDelete={handleOnDelete}
        handleOnSwap={handleOnSwap}
        type="good"
        hour={goodHour}
        handleOnDeleteAll={handleOnDeleteAll}
      />

      {/* Bad List */}
      <TaskList
        title="Bad List"
        tasks={badTasks}
        type="bad"
        handleOnDelete={handleOnDelete}
        handleOnSwap={handleOnSwap}
        hour={badHour}
        handleOnDeleteAll={handleOnDeleteAll}
      />
    </div>
  );
};

export default ListComponent;
