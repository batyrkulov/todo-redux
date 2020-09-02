import {GlobalStateType} from "./redux-store"
import {ThunkAction} from 'redux-thunk'

const base = 'task/addition/';

const SET_FIELD_TEXT = base+'SET_FIELD_TEXT';

const initialState = {
    fieldText: ''
}
type InitialStateOfAdditionReducerType = typeof initialState

const additionReducer = (state: InitialStateOfAdditionReducerType=initialState, action: ActionsTypes) : InitialStateOfAdditionReducerType => {
    switch (action.type) {
        case SET_FIELD_TEXT:
            {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

type SetFieldTextActionType = {
    type: typeof SET_FIELD_TEXT
    payload: {
        fieldText: string
    }
}

type ActionsTypes = SetFieldTextActionType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type setFieldTextActionType = {type: typeof SET_FIELD_TEXT, payload: {fieldText: string}}
export const setFieldText = (fieldText: string) : setFieldTextActionType => ({type: SET_FIELD_TEXT, payload: {fieldText}});

export const updateFieldText = (text: string) : ThunkType => async (dispatch) => {
    dispatch(setFieldText(text));
}

export default additionReducer;