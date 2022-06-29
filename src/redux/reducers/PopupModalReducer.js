import { SET_SUBMIT_CREATE_TASK } from "../constants/Cyberbugs/TaskConstants"
import { EDIT_PROJECT, FORM_ON, OPEN_CREATE_TASK, VISIBLE_OFF, VISIBLE_ON } from "../constants/Modal/PopupModal"

const initialState = {
    visible: false,
    title:'',
    componentContent: <p>defaultssfa-stack-1x</p>,
    callbackSubmit: (props) => {alert('abcd')}
}

export const PopupModalReducer = (state = initialState, action) => {
    switch (action.type) {

        case VISIBLE_ON: {
            state.visible = true
            return { ...state }
        }

        case VISIBLE_OFF: {
            state.visible = false
            return { ...state }
        }
        
        case FORM_ON: {
            state.visible = true
            state.title = action.title
            state.componentContent = action.component
            return { ...state }
        }
        case EDIT_PROJECT: {
            //state.visible = true
            //state.componentContent = action.component
            state.callbackSubmit = action.submitEvent
            return { ...state }
        }
        case OPEN_CREATE_TASK: {
            state.visible = true
            state.componentContent = action.component
            //state.callbackSubmit = action.submitEvent
            return { ...state }
        }

        case SET_SUBMIT_CREATE_TASK: {
            state.callbackSubmit = action.submitEvent
            state.visible = false
            return { ...state }
        }

        default:
            return {...state}
    }
}
