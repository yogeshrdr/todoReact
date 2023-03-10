import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Select } from '../lib';
import { ADDTODO } from '../redux/actions/todoAction';
import './addTodo.css';



class AddTodo extends Component {
  constructor(){
    super();
    this.state = {task: "", dueDate: "", priority: "low"}
    this.priority = [
      {value: "low", title: "Low"},
      {value: "medium", title:"Medium"},
      {value: "high", title:"High"}
    ];
  }
 
  onChange = (event) => {
    this.setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  onSubmit = (event) =>{
      event.preventDefault();
      console.log("yes")

        if(this.state.task === ''  || this.state.dueDate === ''){
          alert('Please Fill Details')
          return;
        }
        
        const date = new Date(this.state.dueDate);
        const dueDate = date.getTime();

        const task = {
          id: Date.now(),
          progress: 'assign',
          task : this.state.task,
          dueDate,
          priority: this.state.priority,
          completedDate: null
        };

        this.props.ADDTODO(task);

        this.setState({
          task: "", 
          dueDate: "", 
          priority: "low", 
        });

        const {handleModal} = this.props;
        handleModal(false);
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

        <form className='todolist__form ' onSubmit={this.onSubmit}>
            <Input 
            label = 'Task'
            name = 'task'
            placeholder = 'Add Task....'
            value = {this.state.task}
            onChange={this.onChange}
            required={true}
            />             
                      
            <Input 
            label = 'Due Date'
            type="date" 
            name="dueDate" 
            value={this.state.dueDate} 
            onChange={this.onChange}
            required = {true}
            />

            <Select
            label="Priority"
            name="priority"
            value={this.state.priority}
            onChange={this.onChange}
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


export default connect(
  null,
  { ADDTODO }
)(AddTodo);