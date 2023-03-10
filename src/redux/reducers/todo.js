import { ADD_TODO, UPDATE_TODO, DELETE_TODO, TODO} from "../constants";

const initalState = {
    todos: JSON.parse(localStorage.getItem(TODO)) || []
}

const todoReducer = (state = initalState, action) => {
    //switch case
    if(action.type === ADD_TODO){
        const todos = [...state.todos, action.payload];
        localStorage.setItem(TODO, JSON.stringify(todos));
        return {
            ...state,
            todos
        }
    }

    else if(action.type === UPDATE_TODO){
        const {id, data} = action.payload;
        const todos = state.todos.map(todo => {
            if(todo.id===id){
                if(data.value === 'done'){
                    todo.completedDate = Date.now();
                }
                todo[data.type] = data.value;
            }
            return todo;
        });
        localStorage.setItem(TODO, JSON.stringify(todos));
        return{
            ...state,
            todos
        }
    }

    else if(action.type === DELETE_TODO){
        const {id} = action.payload;
        const todos = state.todos.filter(todo => todo.id !== id);
        localStorage.setItem(TODO, JSON.stringify(todos));
        return {
            ...state,
            todos
        }
    }

    return state;
};

export default todoReducer;