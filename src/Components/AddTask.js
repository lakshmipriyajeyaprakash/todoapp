import React, { useState, useRef } from "react";
import ToDos from "./ToDos";
import "bootstrap/dist/css/bootstrap.css";

const AddTask = () => {
  const [addtask, setAddTask] = useState("");
  const [tasksadded, setTasksAdded] = useState([]);
  const [togglebutton, setToggleButton] = useState("Add Task");
  const [editIndex, setEditIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [taskdisplay, setTaskDisplay] = useState(false);
  const inputRef = useRef();
  const handleInputChange = (e) => {
    setAddTask(e.target.value);
  };
  const handleSubmit = (e) => {
    if (addtask.trim() !== "") {
      if (togglebutton === "Add Task") {
        setTasksAdded((prevTasksAdded) => [...prevTasksAdded, addtask]);
      } else {
        const toUpdateTasks = [...tasksadded];
        toUpdateTasks[editIndex] = addtask;
        setTasksAdded(toUpdateTasks);
      }
    }
    e.preventDefault();
    setAddTask("");
    setToggleButton("Add Task");
  };
  const handleEdit = (editIndex) => {
    setToggleButton("Edit");
    setAddTask(tasksadded[editIndex]);
    console.log(addtask);
    setEditIndex(editIndex);
    console.log(editIndex);
  };
  const handleDelete = (deleteTask) => {
    setTasksAdded((prevTasksAdded) =>
      prevTasksAdded.filter((task) => task !== deleteTask)
    );
  };
  const handleCheck = (checkedIndex) => {
    setCheckedItems((prevCheckedState) => ({
      ...prevCheckedState,
      [checkedIndex]: !prevCheckedState[checkedIndex],
    }));
  };
  const ShowAll = () => {
    setTaskDisplay(false);
  };
  const ShowCompleted = () => {
    setTaskDisplay(true);
  };
  console.log(taskdisplay);
  const filtered = taskdisplay
    ? tasksadded.filter((task, taskIndex) => checkedItems[taskIndex])
    : tasksadded;
  return (
    <div class="container d-flex flex-column gap-2 text-center">
      <h2 class="header">ToDo App</h2>

      <form
        class="row justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          class="inputwidth col-6 m-1 form-control"
          value={addtask}
          onChange={handleInputChange}
        ></input>
        <button type="submit" class="buttonclass btn btn-primary ">
          {togglebutton}
        </button>
      </form>
      <div class="d-flex flex-row gap-2 justify-content-center">
        <button class="filterbutton btn btn-primary" onClick={ShowAll}>
          All Tasks
        </button>
        <button class="filterbutton btn btn-primary" onClick={ShowCompleted}>
          Completed
        </button>
      </div>
      <ul class="list-group d-flex justify-content-center liststyle">
        {filtered.map((taskadded, index) => (
          <ToDos
            key={index}
            index={index}
            handleEdit={handleEdit}
            taskadded={taskadded}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
            checkedItems={checkedItems}
            taskdisplay={taskdisplay}
          ></ToDos>
        ))}
      </ul>
    </div>
  );
};
export default AddTask;
