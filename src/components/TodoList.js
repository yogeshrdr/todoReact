import React, { Component } from 'react';
import { setLocalStorage, getLocalStorage } from '../api/localApi';
import Todo from './Todo';
import '../css/todolist.css';
import '../css/card.css';
import { AiFillSetting } from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";
import {Tag, SideModal, Button, Dropdown} from '../lib';
import Table from '../lib/organisms/table/Table';
import AddTodo from './AddTodo';
import { dateFormat } from '../utilites';


export class TodoList extends Component {
   constructor(){
        super();
        this.state = {
            inputValue : {task: "", dueDate: "", priority: "low"},
            todos : [],
            isOpen: false,
            filter: 'all',
            filtertodos : [],
            actionDisable: false,
            oncheckSelect :[]
        };

        this.tags = [
          {title: "All Task", name:"all"},
          {title: "Assigned", name: "assign"},
          {title: "In Progress", name:"progress"},
          {title: "Task Completed", name:"done"}
        ];
    };

    componentDidMount(){
        const todos = getLocalStorage("todos"); //Constants
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
    };

    handleTaskSubmit = (event) => {
        event.preventDefault();

        if(this.state.inputValue.task === ''  || this.state.inputValue.dueDate === ''){
          alert('Please Fill Details')
          return;
        }
        
        const date = new Date(this.state.inputValue.dueDate);
        const dueDate = date.getTime();

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
          filter: 'all',
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
      var todos = this.state.todos;
      if(value === 'all'){
        return todos;
      }

      todos = todos.filter(todo =>todo.progress === value);
      return todos;
    };

    onFilter = (value) => {
      console.log('yes')
      this.setState({filter: value});
    }


    onCheck = (event, id) => {
       if(event.target.checked === true){
          const checked = [...this.state.oncheckSelect, id];
          this.setState({
            oncheckSelect: checked
          });
       }
       else{
          const checked = this.state.oncheckSelect.filter((item) => item !== id);
          this.setState({
            oncheckSelect: checked
          });
       }
    };

    onCheckAll = (event) => {
        if(event.target.checked === true){
              var checkbox = [];
              this.state.todos.forEach( todo => {
                checkbox = [...checkbox, todo.id];
              });

              this.setState({
                oncheckSelect: checkbox
              });
        }else{
            this.setState({
              oncheckSelect:[]
            })
        }
    };

    onAction = (event) => {
        if(event.target.name ===  'delete'){
          this.setState({
            todos: []
          });
          return;
        }
      
       const todos = this.state.todos;
       todos.forEach((todo) => {
          this.state.oncheckSelect.forEach((id) => {
            if(todo.id === id){
              if(todo.progress!== 'done' && event.target.name === 'done'){
                todo.completedDate = Date.now();
              }
      
              if(event.target.name !== 'done'){
                todo.completedDate = null;
              }
      
              todo.progress = event.target.name
            }
          })
        });
        setLocalStorage("todos", todos);
        this.setState({
          todos
        });
    }



    onProgressChange = (event, id) => {
      const todos = this.state.todos;
      const todosIndex = this.state.todos.findIndex(todo =>todo.id === id);
      todos[todosIndex].progress = event;

      if(event === "done"){
        todos[todosIndex].completedDate = Date.now();
      }
      setLocalStorage("todos", todos);
      this.setState({
        todos
      });
    }


    tableHead = () => {
      const headData = [
          {
              name: <input type="checkbox" checked={this.state.oncheckSelect.length >= 2} onChange={this.onCheckAll}/>,
              dataKey: 'id',
              renderer: (data) => {
                  return <input type="checkbox" checked={this.state.oncheckSelect.includes(data)} onChange={(e) => this.onCheck(e, data)}/>
              }
          },
          {
              name: "Title",
              dataKey: "task",
              renderer: (data) => {
                return data;
              }
          },
          {
              name: "Due Date",
              dataKey: "dueDate",
              renderer: (data) => {
                  return dateFormat("dueDate", data);
              }
          },
          {
              name: "Completed Date",
              dataKey: "completedDate",
              renderer: (data) =>{
                if(data==null){
                  return '-';
                }
                return dateFormat("completedDate", data);
              }
          },
          {
              name: "Progress",
              dataKey: "progress",
              renderer: (data) => {
                  return <div className={
                    data === 'assign' ? 'tag__red' : data === 'progress' ? 'tag__blue' : 'tag__green'
                  }>
                    {data}
                  </div>
              }
          },
          {
              name: "Priority",
              dataKey: "priority",
              renderer: (data) => {
                return <div className={
                  data === 'high' ? 'tag__red' : data === 'medium' ? 'tag__blue' : 'tag__green'
                }>
                  {data}
                </div>
              }
          },
          {
              name: <AiFillSetting size="20px"/>,
              dataKey: 'id',
              renderer: (data) => {
                  return <Dropdown type="text" title="..." disabled={false}>
                      <Button btnType="text" onClick={() => this.onProgressChange("progress", data)}>Progress</Button>
                      <Button btnType="text" onClick={() => this.onProgressChange("done", data)}>Done</Button>
                      <Button btnType="text" onClick={() => this.handleTaskDelete(data)}>Delete</Button>
                  </Dropdown>
              }
          }
      ]
  
      return headData;
  };


    
  render() {
    return (
      <div className='todolist'>
        <div className='todolist__header'>
          <h1>TodoList</h1>
          <Button btnType="outlined" type="button" onClick={() => this.handleModal(true)}>Add Task + </Button>
        </div>

        <div className='todo__filterContainer'>
          <div className='todo__cardsDetail'>
            {
              this.tags.map((tag) => (
                <Tag
                key={tag.name}
                title={tag.title}
                name={tag.name}
                length={this.getTotalProgress(tag.name)}
                isActive={this.state.filter === tag.name}
                onClick={this.onFilter}
                />
              ))
            }
          </div>
          <div className='todo__filteraction'>
          <div className='todo__filterResults'>Total Results : {this.getTotalProgress(this.state.filter)}</div>
          <div className='btngap'></div>

          <Dropdown type="outlined" title="Action" disabled={this.state.oncheckSelect.length < 2}>
              <Button name="progress" btnType="text" onClick={this.onAction}>All Progress</Button>
              <Button name="done" btnType="text" onClick={this.onAction}>All Done</Button>
              <Button name="delete" btnType="text" onClick={this.onAction}>All Delete</Button>
          </Dropdown>
          
          </div>
        </div>

        <SideModal isOpen={this.state.isOpen}>
          <AddTodo 
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onSubmit={this.handleTaskSubmit}
          handleModal={this.handleModal}
          />     
        </SideModal>
        
        <div className='todo__table'>
          <Table 
          head={this.tableHead()}
          body={this.onFilterChange(this.state.filter)}
          />

          {this.onFilterChange(this.state.filter).length === 0 && <div className='todo_notask'>No Record Found</div>}
        </div>

        

          {/* {this.state.filtertodos.length === 0 ?
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
        } */}
      </div>
    )
  }
}

export default TodoList;