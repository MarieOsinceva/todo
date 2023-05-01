import React, { Component } from "react";
import "./todo-list-item.css";
// import { useTheme } from '@react-navigation/native';

export default class ToDoListItem extends Component {

  render() {

    const {
      lable,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done
    } = this.props;

    let className = "todo-list-item";
    if (done) {
      className += " done";
    }

    if (important) {
      className += " important";
    }

    return (
      <span className={className}>
        <div className="todo-list-item-label" onClick={onToggleDone}>
          {lable}
        </div>
        <div>
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
        </button>
        </div>
      </span>
    );
  }
}
// const ToDoListItemF = ({ lable, important = false }) => {
//   const style = {
//     color: important ? "tomato" : "black"
//   };
//   const {Icons} = useTheme();
//   return (
//     <span className="todo-list-item">
//       <span className="todo-list-item-label" style={style}>
//         {lable}
//       </span>
//       <button type="button" className="btn btn-outline-success btn-sm">
//         <i className="fa fa-exclamation" />
//       </button>
//       <button type="button" className="btn btn-outline-danger btn-sm">
//       <img src="Icons.trash" width={18} />
//       </button>
//     </span>
//   );
// };
// export default ToDoListItemF;
