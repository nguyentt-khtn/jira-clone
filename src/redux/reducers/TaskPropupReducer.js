import { CHANGE_TASK, GET_DETAIL } from "../constants/Cyberbugs/TaskConstants"
import { CHANGE_ASSIGNESS, REMOVE_ASSIGNESS } from "../constants/Modal/PopupModal"

const initialState = {
    taskDetail: {
        alias: "brother",
        assigness: [],
        description: "<p>This is the initial content of the editor.</p>",
        lstComment: [
            { id: 3254, idUser: 1433, name: 'tintuong95', avatar: 'https://ui-avatars.com/api/?name=tintuong95', commentContent: 'xcvxcvxcvzvcsdaf ádf' },
            { id: 3255, idUser: 1433, name: 'tintuong95', avatar: 'https://ui-avatars.com/api/?name=tintuong95', commentContent: 'xcvxcvxcvzvcsdfa' },
            { id: 3256, idUser: 1433, name: 'tintuong95', avatar: 'https://ui-avatars.com/api/?name=tintuong95', commentContent: 'xcvxcvxcvzvcsdfaasdfsad' }
        ],
        originalEstimate: 1,
        priorityId: 0,
        priorityTask: { priorityId: 3, priority: 'Low' },
        projectId: 3604,
        statusId: "3",
        taskId: 3169,
        taskName: "Brother",
        taskTypeDetail: { id: 2, taskType: 'new task' },
        timeTrackingRemaining: 1,
        timeTrackingSpent: 1,
        typeId: 0
    }
}

export const TaskPopupReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DETAIL: {
            state.taskDetail = action.data
            return { ...state }
        }

        case CHANGE_TASK: {
            const { name, value } = action
            return { ...state, taskDetail: { ...state.taskDetail, [name]: value } }
        }
        case CHANGE_ASSIGNESS:{
            state.taskDetail.assigness = [...state.taskDetail.assigness,action.userSelect]
            return {...state}
        }
        case REMOVE_ASSIGNESS:{
            state.taskDetail.assigness = [...state.taskDetail.assigness.filter(item => item.id !== action.userId)]
            return {...state}
        }
        default:
            return {...state}
    }
}
