import { GET_ALL_USER, GET_PRIORITY, GET_STATUS, GET_TASK_TYPE, GET_USER_BY_ID } from "../constants/Cyberbugs/TaskConstants"
import { GET_USER_API } from "../constants/Cyberbugs/UserConstants"

const initialState = {
    listTaskType:[],
    listPriority:[],
    listAllUser:[],
    listStatus:[],
    listUserById:[]
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_TYPE: {
            state.listTaskType = action.data
            return { ...state }
        }
        case GET_PRIORITY: {
            state.listPriority = action.data
            return { ...state }
        }
        case GET_ALL_USER: {
            state.listAllUser = action.data
            return { ...state }
        }
        case GET_STATUS: {
            state.listStatus = action.data
            return { ...state }
        }
        case GET_USER_BY_ID: {
            state.listUserById = action.data
            return { ...state }
        }
        default:
            return state
    }
}
