import React, { Component } from 'react';
import { setLocalStorage, getLocalStorage } from '../api/localApi';
import Todo from './Todo';
import '../css/todolist.css';
import Card from './Card';
import '../css/card.css';


export class TodoList extends Component {
   constructor(){
        super();
        this.state = {
            inputValue : {task: "", dueDate: "", priority: "low"},
            todos : [],
            isOpen: false
        };
    };


    componentDidMount(){
        const todos = getLocalStorage("todos");
        if(todos){
          this.setState({
            todos
          });
        }
    };


    handleInputChange = (event) => {
        const inputValue = {...this.state.inputValue, [event.target.name]: event.target.value};
        this.setState({
          inputValue 
        })
    };

    handleModal = (value) => {
        this.setState({
          isOpen : value
        })
    }


    handleTaskSubmit = (event) => {
        event.preventDefault();

        if(this.state.inputValue.task === ''  || this.state.inputValue.dueDate === ''){
          alert('Please Fill Details')
          return;
        }

        const task = {
          id: Date.now(),
          progress: 'assign',
          task : this.state.inputValue.task,
          dueDate: this.state.inputValue.dueDate,
          priority: this.state.inputValue.priority
        };

        const todos = [...this.state.todos, task];
        setLocalStorage("todos", todos);
        const inputValue =  {task: "", dueDate: "", priority: "low"}

        this.setState({
          inputValue,
          todos: [...this.state.todos, task],
          isOpen: false
        });
    };

    handleTaskDelete = (id) => {
        const todos = this.state.todos.filter(todo =>todo.id !== id);
        setLocalStorage("todos", todos);
        this.setState({
          todos
        });
    };

    handleTaskChange = (todo) => {
        const todos = this.state.todos;
        const index = this.state.todos.findIndex(t =>t.id === todo.id);
        todos[index] = todo;
        setLocalStorage("todos", todos);
        this.setState({
          todos
        });
    };
    
    getTotalProgress = (value) => {
        var totalProgress = 0;
        this.state.todos.forEach((todo)=>{
          if(todo.progress === value){
            totalProgress = totalProgress+1;
          }
        })
        return totalProgress;
    };

    
  render() {

    return (
      <div className='todolist'>
        <div className='todolist__header'>
          <h1>TodoList</h1>
          <button className='todolist_addtaskbtn' onClick={() => this.handleModal(true)}>Add Task + </button>
        </div>

        <div className='todo__cardsDetail'>
        <Card 
        title="Task Assign"
        data={this.state.todos.length}
        />

        <Card 
        title="Task in Progress"
        data={this.getTotalProgress('progress')}
        />

        <Card 
        title="Task Done"
        data={this.getTotalProgress('done')}
        />
        </div>

        {this.state.isOpen && 
                  <div className='todo__modal'>
                  <form className='todolist__form' onSubmit={this.handleTaskSubmit}>
                    <button className='todolist__closebtn' type="button" onClick={() => this.handleModal(false)}>X</button>
                      <label>Task</label>
                      <input 
                      name="task" 
                      value={this.state.inputValue.task} 
                      onChange={this.handleInputChange}/>
          
                      <label>Due Date</label>
                      <input 
                      type="date" 
                      name="dueDate" 
                      value={this.state.inputValue.dueDate} 
                      onChange={this.handleInputChange}/>
          
                      <label>Priority</label>
                      <select 
                      name="priority" 
                      onChange={this.handleInputChange} 
                      defaultValue={this.state.inputValue.priority}>
                          <option value="low">low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                      </select>
          
                      <button type="submit">Add Todo</button>
                  </form>
                  </div>
        }

        {this.state.todos.length === 0 ? 
          <div className='todo_notask'>No task Assign</div>
          :
          <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Due Date</th>
              <th>Progreess</th>
              <th>Priority</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
              <Todo
              todo={todo}
              handleTaskDelete={this.handleTaskDelete}
              handleTaskChange={this.handleTaskChange}
              />
            </tr>
            ))}
          </tbody>
        </table>
        }

       
      </div>
    )
  }
}

export default TodoList