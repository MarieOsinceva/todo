import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import "./app.css";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 100;

  createToDoItem = (label) => {
    return {
      lable: label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  state = {
    todoData: [
      this.createToDoItem("Drink coffee"),
      this.createToDoItem("Buld app"),
      this.createToDoItem("Go for a walk")
    ],
    term:'',
    filter:''
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArr };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newData = this.createToDoItem(text);
      const newArr = [...todoData, newData];
      return { todoData: newArr };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "done") };
    });
  };


  filter=((items, filter) =>{
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return  items.filter((el) => !el.done )
      case 'done':
      return  items.filter((el) => el.done )
      default: 
      return items;
  }
  });

  onFilterChange=(filter)=>{
    this.setState({filter});
  };

  search (items, term){
    if(term.length === 0){
      return items;
    }
  return items.filter((item)=> {
    return item.lable
            .toLowerCase()
            .indexOf(term.toLowerCase()) >-1 
  })
  }
  onSearchChange=(term)=>{
    this.setState({term});
  };


  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter)
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="app">
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdded={this.addItem} />
      </div>
      </div>
    );
  }
}
