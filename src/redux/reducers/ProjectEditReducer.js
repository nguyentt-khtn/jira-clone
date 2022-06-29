import { SEND_EDIT_PROJECT } from "../constants/Modal/PopupModal"

const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        creator: 0,
        description: '<p>description</p>',
        categoryId: "2"
    }
}

export const ProjectEditReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_EDIT_PROJECT: {
            state.projectEdit = action.project
            return { ...state }
        }
        default:
            return { ...state }
    }
}
