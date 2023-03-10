export const getStore = store => store;

export const getTodos = store => store.todoReducer.todos;

export const getFilter = store => store.filterReducer;

export const getFilterTodos = store => {
    if(getFilter(store) === 'all'){
        return getTodos(store);
    }
    return getTodos(store).filter((todo) => todo.progress === getFilter(store));
} 


