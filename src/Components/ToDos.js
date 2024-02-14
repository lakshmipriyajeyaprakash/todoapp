import React from "react";
import DeleteIcon from "./assets/DeleteIcon";
import EditIcon from "./assets/EditIcon";
const ToDos = ({
  index,
  handleEdit,
  taskadded,
  handleDelete,
  handleCheck,
  checkedItems,
  taskdisplay,
}) => {
  return (
    <div>
      {!taskdisplay ? (
        <li
          class={`mainliststyle list-group-item d-flex justify-content-between align-items-center ${
            checkedItems["CheckItem" + index] ? "bg-success" : ""
          }`}
          key={index}
        >
          <div class="taskliststyle">
            <input
              type="checkbox"
              checked={checkedItems["CheckItem" + index]}
              onChange={() => handleCheck(index)}
            ></input>
            <div>{taskadded}</div>
          </div>
          <div class="taskliststyle">
            <button
              class="editclass btn btn-primary"
              onClick={() => handleDelete(taskadded)}
            >
              <DeleteIcon></DeleteIcon>
            </button>
            <button
              class="editclass btn btn-primary"
              onClick={() => handleEdit(index)}
            >
              <EditIcon></EditIcon>
            </button>
          </div>
        </li>
      ) : (
        <li
          class={`mainliststyle list-group-item d-flex justify-content-between align-items-center`}
          key={index}
        >
          <div class="taskliststyle">
            <div>{taskadded}</div>
          </div>
          <div class="taskliststyle">
            <button
              class="editclass btn btn-primary"
              onClick={() => handleDelete(taskadded)}
            >
              <DeleteIcon></DeleteIcon>
            </button>
            <button
              class="editclass btn btn-primary"
              onClick={() => handleEdit(index)}
            >
              <EditIcon></EditIcon>
            </button>
          </div>
        </li>
      )}
    </div>
  );
};
export default ToDos;
