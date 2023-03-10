import { SET_FILTER } from "../constants";

const initalState = 'all';

const filterReducer = (state = initalState, action) => {
    if(action.type ===  SET_FILTER){
        return action.payload;
    }

    return state;
}

export default filterReducer;