import React, { Component } from 'react';
import '../css/todolist.css';
import '../css/card.css';
import { AiFillSetting } from "react-icons/ai";
import {Tag, SideModal, Button, Dropdown} from '../lib';
import Table from '../lib/organisms/table/Table';
import AddTodo from './AddTodo';
import { dateFormat } from '../utilites';
import { connect } from 'react-redux';
import { getFilter, getFilterTodos, getTodos } from '../redux/selectors';
import { DELETETODO, FILTERTODO, UPDATETODO } from '../redux/actions/todoAction';



class TodoList extends Component {
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

    handleModal = (value) => {
        this.setState({
          isOpen : value
        })
    };
 

    handleTaskDelete = (id) => {
        this.props.DELETETODO(id);
    };
    
    getTotalProgress = (value) => {
        if(value === 'all'){
          return this.props.allTodo.length;
        }
        var totalProgress = 0;
        this.props.allTodo.forEach((todo)=>{
          if(todo.progress === value){
            totalProgress = totalProgress+1;
          }
        })
        return totalProgress;
    };

    onFilterChange = (value) => {
      var todos = this.props.todos;
      if(value === 'all'){
        return todos;
      }

      todos = todos.filter(todo =>todo.progress === value);
      return todos;
    };

    onFilter = (value) => {
      this.props.FILTERTODO(value)
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
          this.state.oncheckSelect.forEach((id) => {
            this.props.DELETETODO(id);
          })
        }
        else{
          this.state.oncheckSelect.forEach((id) => {
            this.props.UPDATETODO(id, {type: 'progress', value: event.target.name})
          });
        }

        this.setState({
          oncheckSelect: []
        })
        
    }


    onProgressChange = (value, id) => {
      this.props.UPDATETODO(id, {type: 'progress', value})
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
                isActive={this.props.filter === tag.name}
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
          // onChange={this.handleInputChange}
          // onSubmit={this.handleTaskSubmit}
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
      </div>
    )
  }
}


const mapStatetoProps = state => {
    const allTodo = getTodos(state)
    const todos = getFilterTodos(state);
    const filter = getFilter(state);
    return {allTodo,todos,filter};
}

//mapDispatchtoProps

export default connect(
  mapStatetoProps,
  {FILTERTODO, DELETETODO, UPDATETODO}
)(TodoList);
