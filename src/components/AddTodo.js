import React, { Component } from 'react';
import { Button, Input, Select } from '../lib';
import './addTodo.css'

export default class AddTodo extends Component {
  constructor(){
    super();
    this.priority = [
      {value: "low", title: "Low"},
      {value: "medium", title:"Medium"},
      {value: "high", title:"High"}
    ];
  }
 
  onChangeInput = (event) => {
    const {onChange} = this.props;
    onChange(event);
  }

  onSubmitTask = (event) =>{
    const {onSubmit} = this.props;
    onSubmit(event);
  }

  handleCancel = ()  => {
    const {handleModal} = this.props;
    handleModal(false);
  }

  render() {
    return (
      <>
        <div className='todolist__formHeader'>
            <div className='todolist__formHeading'> Add Task</div>
            <Button btnType="canceltext" type="button" onClick={this.handleCancel}>X</Button>
        </div>

        <form className='todolist__form ' onSubmit={this.onSubmitTask}>
            <Input 
            label = 'Task'
            name = 'task'
            placeholder = 'Add Task....'
            value = {this.props.value.task}
            onChange={this.onChangeInput}
            required={true}
            />             
                      
            <Input 
            label = 'Due Date'
            type="date" 
            name="dueDate" 
            value={this.props.value.dueDate} 
            onChange={this.onChangeInput}
            required = {true}
            />

            <Select
            label="Priority"
            name="priority"
            value={this.props.value.priority}
            onChange={this.onChangeInput}
            options={this.priority}
            />

            <div className='todolist__btncontainer'>
              <Button btnType="outlined" type="button" onClick={this.handleCancel}>Cancel</Button>
              <div className='btngap'></div>
              <Button btnType="contained" type="submit">Add Todo</Button>
              <div className='btngap'></div>
            </div>
        </form>      
      </>
    )
  }
}
