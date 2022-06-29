import { SEND_EDIT_USER } from "../constants/Cyberbugs/RegisterConstants"

const initialState = {
    userEdit: {
        avatar: '',
        email: '',
        name: '',
        phoneNumber: '',
        stt: 0,
        userId: 0,
    }
}

export const EditUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_EDIT_USER: {
            state.userEdit = action.user
            return { ...state }
        }
        default:
            return { ...state }
    }
}