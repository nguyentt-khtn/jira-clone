import { GET_ALL_PROJECT, GET_ALL_PROJECT_TASK, GET_PROJECT, GET_PROJECT_DETAIL } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    projectList: [
        
    ],
    arrayProjectDetail: [],
    arrayProjectTask:[]
}

export const GetProjectReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case GET_ALL_PROJECT: {
            state.projectList = action.data
            return { ...state }
        }
        case GET_PROJECT_DETAIL:{
            state.arrayProjectDetail = action.data
            return {...state}
        }
        case GET_ALL_PROJECT_TASK:{
            state.arrayProjectTask = action.data
            return {...state}
        }
        default:
            return { ...state }
    }
}
