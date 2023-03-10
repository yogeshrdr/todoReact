import { ADD_TODO, DELETE_TODO, SET_FILTER, UPDATE_TODO } from "../constants"

// ADD_TODO
export const ADDTODO = (data) =>({type: ADD_TODO, payload: data});

export const UPDATETODO = (id, data) =>({type: UPDATE_TODO, payload: {id, data}});

export const DELETETODO = (id) =>({type: DELETE_TODO, payload: {id}});

export const FILTERTODO = (data) => ({type: SET_FILTER, payload: data});
