import { GET_ALL_COMMENT } from "../constants/Cyberbugs/CommentConstant"

const initialState = {
    listComment:[]
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_COMMENT:
            state.listComment = action.listComment
            return { ...state }

        default:
            return { ...state }
    }
}
