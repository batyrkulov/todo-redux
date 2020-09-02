import {updateFieldText} from "./addition-reducer"
import {ThunkAction} from 'redux-thunk'
import {GlobalStateType} from "./redux-store";

const base = 'task/tasks/'

const ADD_TASK = base+'ADD_TASK'
const UPDATE_TASK = base+'UPDATE_TASK'
const DELETE_TASK = base+'DELETE_TASK'

export type TaskType = {
    id: string
    name: string
    spentTime: number
    lastStartTime: number | boolean
}

const initialState = {
    tasks: [] as Array<TaskType>
}

type InitialStateType = typeof initialState

const tasksReducer = (state :InitialStateType=initialState, action: ActionsTypes) : InitialStateType => {
    switch (action.type) {
        case ADD_TASK: {
            return {...state, tasks: [action.task, ...state.tasks]}
        }
        case UPDATE_TASK: {
            return {tasks: state.tasks.map(task=>{
                if (task.id===action.task.id) return action.task;
                else return task;
            })}
        }
        case DELETE_TASK: {
            return {tasks: state.tasks.filter(task=>task.id!==action.id)}
        }
        default:
            return state;
    }
}

type ActionWithTaskType = {
    task: TaskType
}
type AddTaskActionType = ActionWithTaskType & {
    type: typeof ADD_TASK
}
type UpdateTaskActionType = ActionWithTaskType & {
    type: typeof UPDATE_TASK
}
type RemoveTaskActionType = {
    type: typeof DELETE_TASK
    id: string
}
type ActionsTypes =  AddTaskActionType & UpdateTaskActionType & RemoveTaskActionType
type ThunkActionsTypes =  AddTaskActionType | UpdateTaskActionType | RemoveTaskActionType

export const addTask = (task: TaskType) : AddTaskActionType => ({type: ADD_TASK, task});
export const updateTask = (task: TaskType) : UpdateTaskActionType => ({type: UPDATE_TASK, task});
export const removeTask = (id: string) : RemoveTaskActionType => ({type: DELETE_TASK, id});
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ThunkActionsTypes>

export const createTask = () : ThunkType => async (dispatch, getState)  => {
    dispatch(addTask({
        id: Math.random().toString(36).substr(2, 9),
        name: getState().additionReducer.fieldText,
        spentTime: 0,
        lastStartTime: Math.round(new Date().getTime() / 1000)
    }));
    dispatch(updateFieldText(''));
}

export const startTask = (id: string) : ThunkType => async (dispatch, getState) => {
    let tasks = getState().tasksReducer.tasks;
    for(let i=0; i<tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].lastStartTime = Math.round(new Date().getTime() / 1000)
            dispatch(updateTask(tasks[i]))
            break
        }
    }
}

export const stopTask = (id: string) : ThunkType => async (dispatch, getState) => {
    let tasks = getState().tasksReducer.tasks;
    let task : TaskType | boolean =false
    for(let i=0; i<tasks.length; i++) {
        if (tasks[i].id === id) task = tasks[i]
    }
    if (task && task.lastStartTime!==false) {
        task.spentTime += Math.round(new Date().getTime() / 1000) - +task.lastStartTime
        task.lastStartTime = false
        dispatch(updateTask(task))
    }
}

export const deleteTask = (id: string) : ThunkType => async (dispatch)  => {
    dispatch(removeTask(id))
}

export default tasksReducer;