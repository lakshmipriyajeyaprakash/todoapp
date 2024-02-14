import React, { useReducer, useMemo } from "react";
import ToDos from "./ToDos";
import "bootstrap/dist/css/bootstrap.css";

const initialState = {
  addTask: "",
  tasksAdded: [],
  toggleButton: "Add Task",
  editIndex: null,
  checkedItems: {},
  taskDisplay: false,
};

const actionTypes = {
  SET_ADD_TASK: "SET_ADD_TASK",
  SET_TASKS_ADDED: "SET_TASKS_ADDED",
  SET_TOGGLE_BUTTON: "SET_TOGGLE_BUTTON",
  SET_EDIT_INDEX: "SET_EDIT_INDEX",
  SET_CHECKED_ITEMS: "SET_CHECKED_ITEMS",
  SET_TASK_DISPLAY: "SET_TASK_DISPLAY",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ADD_TASK:
      return { ...state, addTask: action.payload };
    case actionTypes.SET_TASKS_ADDED:
      return { ...state, tasksAdded: action.payload };
    case actionTypes.SET_TOGGLE_BUTTON:
      return { ...state, toggleButton: action.payload };
    case actionTypes.SET_EDIT_INDEX:
      return { ...state, editIndex: action.payload };
    case actionTypes.SET_CHECKED_ITEMS:
      return { ...state, checkedItems: action.payload };
    case actionTypes.SET_TASK_DISPLAY:
      return { ...state, taskDisplay: action.payload };
    default:
      return state;
  }
};

const AddTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    dispatch({ type: actionTypes.SET_ADD_TASK, payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addTask, toggleButton, editIndex, tasksAdded } = state;
    if (addTask.trim() !== "") {
      if (toggleButton === "Add Task") {
        dispatch({
          type: actionTypes.SET_TASKS_ADDED,
          payload: [...tasksAdded, addTask],
        });
      } else {
        const toUpdateTasks = [...tasksAdded];
        toUpdateTasks[editIndex] = addTask;
        dispatch({
          type: actionTypes.SET_TASKS_ADDED,
          payload: toUpdateTasks,
        });
      }
    }
    dispatch({ type: actionTypes.SET_ADD_TASK, payload: "" });
    dispatch({ type: actionTypes.SET_TOGGLE_BUTTON, payload: "Add Task" });
  };

  const handleEdit = (editIndex) => {
    const { tasksAdded } = state;
    dispatch({ type: actionTypes.SET_TOGGLE_BUTTON, payload: "Edit" });
    dispatch({
      type: actionTypes.SET_ADD_TASK,
      payload: tasksAdded[editIndex],
    });
    dispatch({ type: actionTypes.SET_EDIT_INDEX, payload: editIndex });
  };

  const handleDelete = (deleteTask) => {
    const { tasksAdded } = state;
    dispatch({
      type: actionTypes.SET_TASKS_ADDED,
      payload: tasksAdded.filter((task) => task !== deleteTask),
    });
  };

  const handleCheck = (checkedIndex) => {
    const { checkedItems } = state;
    dispatch({
      type: actionTypes.SET_CHECKED_ITEMS,
      payload: {
        ...checkedItems,
        ["CheckItem" + checkedIndex]: !checkedItems[checkedIndex],
      },
    });
  };

  const ShowAll = () => {
    dispatch({ type: actionTypes.SET_TASK_DISPLAY, payload: false });
  };

  const ShowCompleted = () => {
    dispatch({ type: actionTypes.SET_TASK_DISPLAY, payload: true });
  };

  const {
    addTask,
    tasksAdded,
    toggleButton,
    /*editIndex,*/
    checkedItems,
    taskDisplay,
  } = state;

  const filtered = useMemo(() => {
    return taskDisplay
      ? tasksAdded.filter(
          (task, taskIndex) => checkedItems["CheckItem" + taskIndex]
        )
      : tasksAdded;
  }, [tasksAdded, checkedItems, taskDisplay]);

  return (
    <div className="container d-flex flex-column gap-2 text-center">
      <h2 className="header">TODOS</h2>
      <form
        className="row justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="inputwidth col-6 m-1 form-control"
          value={addTask}
          onChange={handleInputChange}
        ></input>
        <button type="submit" className="buttonclass btn btn-primary ">
          {toggleButton}
        </button>
      </form>
      <div className="d-flex flex-row gap-2 justify-content-center">
        <button className="filterbutton btn btn-primary" onClick={ShowAll}>
          All Tasks
        </button>
        <button
          className="filterbutton btn btn-primary"
          onClick={ShowCompleted}
        >
          Completed Tasks
        </button>
      </div>
      <ul className="list-group d-flex justify-content-center liststyle">
        {filtered.map((taskadded, index) => (
          <ToDos
            key={index}
            index={index}
            handleEdit={handleEdit}
            taskadded={taskadded}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
            checkedItems={checkedItems}
            taskdisplay={taskDisplay}
          ></ToDos>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
