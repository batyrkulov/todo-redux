import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import tasksReducer from "./tasks-reducer";
import additionReducer from "./addition-reducer";
import {loadState, saveState} from "../utils/localStorage";

let reducers = combineReducers({
    tasksReducer,
    additionReducer
});

type mainReducerType = typeof reducers
export type GlobalStateType = ReturnType<mainReducerType>

const preloadedState = loadState()
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
const store = createStore(reducers, preloadedState,  composeEnhancers(applyMiddleware(thunkMiddleware)));
store.subscribe(()=>{
    saveState(store.getState())
})

export default store;