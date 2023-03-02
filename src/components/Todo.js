import React, { Component } from 'react';
import '../css/todo.css';
import { MdDelete } from "react-icons/md";

export class Todo extends Component {

  handleDelete = () => {
    const {handleTaskDelete, todo} = this.props;
    handleTaskDelete(todo.id); 
  }

  handleCheck = (event) => {
    const {handleTaskChange, todo} = this.props;
    
    if(event.target.checked === true){
        todo.completedDate = Date.now();
        todo.progress = 'done';
    }
    else{
      todo.completedDate = null;
      todo.progress = 'progress';
    }

    handleTaskChange(todo);
  }

  handleProgess = (event) => {
    const {handleTaskChange, todo} = this.props;
    todo.progress = event.target.value;

    if(todo.progress === 'done'){
      todo.completedDate = Date.now();
    }
    else{
      todo.completedDate = null;
    }
    handleTaskChange(todo);
  }

  handleDateFormat = (event, timeStamp) => {
    const dateFormat = new Date(timeStamp);
    var dateString = "";
    var dateTime = "a.m.";
    var dateHours = dateFormat.getHours();
    var dateMinutes = dateFormat.getMinutes();
    var dateSeconds = dateFormat.getSeconds();

    if(dateHours > 12){
        dateHours = dateHours -1;
        dateTime = "p.m.";
    }

    if(dateMinutes < 10){
      dateMinutes = '0' + dateMinutes;
    }

    if(dateSeconds < 10){
      dateSeconds = '0' + dateSeconds;
    }

    if(event === "completedDate"){
      dateString += dateHours + ":" +dateMinutes+":"+ dateSeconds + " " + dateTime + " ";
    }
    dateString += dateFormat.getDate() + "-" + (dateFormat.getMonth()+1) + "-" + dateFormat.getFullYear();

    return  dateString;
  }


  render() {
    return (
      <>
        <td>
          <input className='todo__check'  type="checkbox" checked={this.props.todo.progress === 'done'} onChange={this.handleCheck}/>
        </td>
        <td>
          <p>{this.props.todo.task}</p>
        </td>
        <td><p>{this.handleDateFormat("dueDate", this.props.todo.dueDate)}</p></td>
        <td><p>{this.props.todo.completedDate === null ? `to be completed` : this.handleDateFormat("completedDate", this.props.todo.completedDate)}</p></td>
        <td>
        
        <select className={`todo__progresselect ${this.props.todo.progress === 'assign' ? 'todo__assign' : 
          this.props.todo.progress === 'progress' ? 'todo__progress' :
        'todo__progressdone'}`} value={this.props.todo.progress} onChange={this.handleProgess}>
          <option value="assign">Assign</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        </td>

        <td><div className={this.props.todo.priority === 'low' ? 'todo__prioritylow' : this.props.todo.priority === 'medium' ? 'todo__prioritymedium' : 'todo__priorityhigh'}>{this.props.todo.priority}</div></td>
        <td><button className='todo_delbtn' onClick={this.handleDelete}><MdDelete size="20px"/></button></td>
      </>
    )
  }
}

export default Todo