import { GET_PROJECT } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    arrayProject: []
}

export const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT: {
            state.arrayProject = action.data
            return { ...state}
        }
        default: return {...state}
    }
}
