import { createStore } from "redux";
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

const enchaners = composeWithDevTools();

export const store = createStore(reducers, enchaners);