import React from "react";
import ToDoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elem = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <ToDoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elem}</ul>;
};
export default TodoList;
