import { combineReducers } from "redux";
import todoReducer from './todo';
import filterReducer from './filter';

export default combineReducers({
    todoReducer,
    filterReducer
})