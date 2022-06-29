import { USER_LOGIN } from "../../util/constants/DomainSetting"
import { GET_USER, USER } from "../constants/Cyberbugs/UserConstants"

let user = {}

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateUser = {
    user: user,
    arraySearch: []
}

export const UserReducer = (state = stateUser, action) => {
    switch (action.type) {

        case USER: {
            state.user = action.user
            return { ...state }
        }

        case GET_USER: {
            state.arraySearch = action.data
            return { ...state }
        }
        default: return { ...state }
    }
}