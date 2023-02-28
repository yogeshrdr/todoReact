import React, { Component } from 'react';
import { setLocalStorage, getLocalStorage } from '../api/localApi';
import Todo from './Todo';
import '../css/todolist.css';
import Card from './Card';
import '../css/card.css';
import { AiFillSetting } from "react-icons/ai";


export class TodoList extends Component {
   constructor(){
        super();
        this.state = {
            inputValue : {task: "", dueDate: "", priority: "low"},
            todos : [],
            isOpen: false,
            filter: 'all',
            filtertodos : [] // camelCases -> remove duplicate data
            // on a folder -> arrange to scalable
            //array ofcards
        };
    };

    componentDidMount(){
        const todos = getLocalStorage("todos"); //Constants
        if(todos){
          this.setState({
            todos,
            filtertodos: todos
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
    };

    handleTaskSubmit = (event) => {
        event.preventDefault();

        if(this.state.inputValue.task === ''  || this.state.inputValue.dueDate === ''){
          alert('Please Fill Details')
          return;
        }
        
        const date = new Date(this.state.inputValue.dueDate);
        const dueDate = date.getTime();

        console.log(dueDate);

        const task = {
          id: Date.now(),
          progress: 'assign',
          task : this.state.inputValue.task,
          dueDate,
          priority: this.state.inputValue.priority,
          completedDate: null
        };

        const todos = [...this.state.todos, task];
        setLocalStorage("todos", todos);
        const inputValue =  {task: "", dueDate: "", priority: "low"}

        this.setState({
          inputValue,
          todos: [...this.state.todos, task],
          filtertodos : todos,
          filter: 'all',
          isOpen: false
        });
    };

    handleTaskDelete = (id) => {
        const todos = this.state.todos.filter(todo =>todo.id !== id);
        setLocalStorage("todos", todos);
        this.setState({
          todos,
          filtertodos: todos
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
        if(value === 'all'){
          return this.state.todos.length;
        }
        var totalProgress = 0;
        this.state.todos.forEach((todo)=>{
          if(todo.progress === value){
            totalProgress = totalProgress+1;
          }
        })
        return totalProgress;
    };

    onFilterChange = (value) => {
      if(value === 'all'){
        this.setState({
          filtertodos : this.state.todos,
          filter: value
        });

        return;
      }

      const todos = this.state.todos.filter(todo =>todo.progress === value);

      this.setState({
        filtertodos : todos,
        filter: value
      });
    };

    onCheckAll = (event) => {
        if(event.target.checked === true){
              
        }else{

        }
    }

    
  render() {
    return (
      <div className='todolist'>
        <div className='todolist__header'>
          <h1>TodoList</h1>
          <button className='todolist_addtaskbtn' onClick={() => this.handleModal(true)}>Add Task + </button>
        </div>

        <div className='todo__filterContainer'>
          <div className='todo__cardsDetail'>
            <Card 
            title="All Task"
            data={{
              name: 'all',
              length : this.getTotalProgress('all')
            }}
            isActive ={this.state.filter === 'all'}
            onFilterChange = {this.onFilterChange}
            />

            <Card 
            title="New Assign"
            data={{
              name: 'assign',
              length: this.getTotalProgress('assign')
            }}
            isActive ={this.state.filter === 'assign'}
            onFilterChange = {this.onFilterChange}
            />

            <Card 
            title="In Progress"
            data={{
              name: 'progress',
              length: this.getTotalProgress('progress')
            }}
            isActive ={this.state.filter === 'progress'}
            onFilterChange = {this.onFilterChange}
            />
            <Card 
            title="Task Done"
            data={{
              name: 'done',
              length: this.getTotalProgress('done')
            }}
            isActive={this.state.filter === 'done'}
            onFilterChange = {this.onFilterChange}
            />
          </div>

          <div className='todo__filterResults'>Total Results : {this.getTotalProgress(this.state.filter)}</div>
        </div>
       

        {this.state.isOpen && 
                <div className='todo__modalContainer'>
                  <div className='todo__modal todo__modalslidein'>

                  <div className='todolist__formHeader'>
                      <div className='todolist__formHeading'> Add Task</div>
                      <button className='todolist__closebtn' type="button" onClick={() => this.handleModal(false)}>X</button>
                  </div>


                  <form className='todolist__form ' onSubmit={this.handleTaskSubmit}>              
                      <label>Task</label>
                      <input 
                      placeholder='Add Task....'
                      name="task" 
                      value={this.state.inputValue.task} 
                      onChange={this.handleInputChange}
                      required
                      />
          
                      <label>Due Date</label>
                      <input 
                      type="date" 
                      name="dueDate" 
                      value={this.state.inputValue.dueDate} 
                      onChange={this.handleInputChange}
                      required
                      />
          
                      <label>Priority</label>
                      <select 
                      name="priority" 
                      onChange={this.handleInputChange} 
                      defaultValue={this.state.inputValue.priority}>
                          <option className='' value="low">low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                      </select>

                      <div className='todolist__btncontainer'>
                        <button className='todolist__formcancelBtn' type="button" onClick={() => this.handleModal(false)}>Cancel</button>
                        <button className='todolist__formaddBtn' type="submit">Add Todo</button>
                      </div>
                  </form>
                  </div>
                </div>
        }

        

          {this.state.filtertodos.length === 0 ?
          <div className='todo_notask'>No Record Found</div>
          :
          <table>
              <thead>
                <tr>
                  <th><input type="checkbox"/></th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Task Complete Date</th>
                  <th>Progress</th>
                  <th>Priority</th>
                  <th><AiFillSetting size="20px"/></th>
                </tr>
              </thead>
              <tbody>
                {this.state.filtertodos.map((todo) => (
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

export default TodoList;