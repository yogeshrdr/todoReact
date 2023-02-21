import React, { Component } from 'react';
import '../css/todo.css';

export class Todo extends Component {

  handleDelete = () => {
    const {handleTaskDelete, todo} = this.props;
    handleTaskDelete(todo.id); 
  }

  handleCheck = (event) => {
    const {handleTaskChange, todo} = this.props;
    
    if(event.target.checked === true){
        todo.progress = 'done';
    }
    else{
      todo.progress = 'progress';
    }

    handleTaskChange(todo);
  }

  handleProgess = (event) => {
    const {handleTaskChange, todo} = this.props;

    todo.progress = event.target.value;

    handleTaskChange(todo);
  }


  render() {
    return (
      <>
        <td>
          <div className='todo_checkTask'>
            <input className='todo__check'  type="checkbox" checked={this.props.todo.progress === 'done'} onChange={this.handleCheck}/>
            <p>{this.props.todo.task}</p>
          </div>
        </td>
        <td><p>{this.props.todo.dueDate}</p></td>
        <td>
        <select className='todo__progresselect' value={this.props.todo.progress} onChange={this.handleProgess}>
          <option value="assign">Assign</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        </td>

        <td><div className={this.props.todo.priority === 'low' ? 'todo__prioritylow' : this.props.todo.priority === 'medium' ? 'todo__prioritymedium' : 'todo__priorityhigh'}>{this.props.todo.priority}</div></td>
        <td><button className='todo_delbtn' onClick={this.handleDelete}>delete</button></td>
      </>
    )
  }
}

export default Todo