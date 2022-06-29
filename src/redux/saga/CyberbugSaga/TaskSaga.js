import { call, takeLatest, put, delay, select } from 'redux-saga/effects'
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { projectService } from '../../../services/ProjectService';
import { CHANGE_TASK, CREATE_TASK, CREATE_TASK_API, GET_ALL_USER, GET_ALL_USER_API, GET_DETAIL, GET_DETAIL_API, GET_PRIORITY, GET_PRIORITY_API, GET_STATUS, GET_STATUS_API, GET_TASK_TYPE, GET_TASK_TYPE_API, GET_USER_BY_ID, GET_USER_BY_ID_API, HANDLE_BEFORE_UPDATE_TASK_SAGA, UPDATE_STATUS_API, UPDATE_TASK_API } from '../../constants/Cyberbugs/TaskConstants';
import { CHANGE_ASSIGNESS, FORM_OFF, REMOVE_ASSIGNESS } from '../../constants/Modal/PopupModal';
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';
import { GET_PROJECT_DETAIL_API } from '../../constants/Cyberbugs/Cyberbugs';

//get Task Type
function* getTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getTaskType())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_TYPE,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* followGetTaskTypeSaga() {
    yield takeLatest(GET_TASK_TYPE_API, getTaskTypeSaga)
}

//get Priority
function* getPriority(action) {
    try {
        const { data, status } = yield call(() => projectService.getPriority())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PRIORITY,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* followGetPriority() {
    yield takeLatest(GET_PRIORITY_API, getPriority)
}

//get User
function* getAllUser(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllUser())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* followGetAllUser() {
    yield takeLatest(GET_ALL_USER_API, getAllUser)
}
//get status
function* getStatusSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getStatus())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_STATUS,
                data: data.content
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

export function* followGetStatusSaga() {
    yield takeLatest(GET_STATUS_API, getStatusSaga)
}

//create Task
function* createTaskSaga(action) {

    yield delay(300)

    try {
        const { data, status } = yield call(() => projectService.createTask(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: FORM_OFF })
            notificationFunction('success', 'Create task successfully')
        }
    } catch (errors) {
        console.log(errors.response.data)

    }
}

export function* followCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_API, createTaskSaga)
}

//get User by ID
function* getUserById(action) {

    try {
        const { data, status } = yield call(() => projectService.getUserById(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: GET_USER_BY_ID, data: data.content })
        }
    } catch (errors) {
        if (errors.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({ type: GET_USER_BY_ID, data: [] })
        }
    }
}

export function* followGetUserById() {
    yield takeLatest(GET_USER_BY_ID_API, getUserById)
}

//get task detail
function* getTaskDetail(action) {

    try {
        const { data, status } = yield call(() => projectService.getTaskDetail(action.detailId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: GET_DETAIL, data: data.content })
        }
    } catch (errors) {
        console.log(errors.response.data)
    }
}

export function* followGetTaskDetail() {
    yield takeLatest(GET_DETAIL_API, getTaskDetail)
}

//get task detail
function* updateTask(action) {

    try {
        const { data, status } = yield call(() => projectService.updateTask(action.taskUpdated))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type:GET_PROJECT_DETAIL_API, projectId: action.taskUpdated.projectId })
            yield put({ type: GET_DETAIL_API, detailId: action.taskUpdated.taskId })
        }
    } catch (errors) {
        console.log(errors.response.data)
    }
}

export function* followUpdateTask() {
    yield takeLatest(UPDATE_TASK_API, updateTask)
}

//update status
function* updateStatus(action) {

    try {
        const { data, status } = yield call(() => projectService.updateStatus(action.statusUpdated))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type:GET_PROJECT_DETAIL_API, projectId: action.projectId })
            yield put({ type: GET_DETAIL_API, detailId: action.statusUpdated.taskId })
        }
    } catch (errors) {
        console.log(errors.response.data)
    }
}

export function* followUpdateStatus() {
    yield takeLatest(UPDATE_STATUS_API, updateStatus)
}

//handle before update task
function* handleBeforeUpdateTask(action) {
    const { name, value, userId, userSelect } = action
    switch (action.actionType) {
        case CHANGE_TASK: {
            const { name, value } = action
            yield put({
                type: CHANGE_TASK,
                name,
                value
            })
        } break
        case REMOVE_ASSIGNESS: {
            yield put({
                type: REMOVE_ASSIGNESS,
                userId: action.userId
            })
        } break
        case CHANGE_ASSIGNESS: {
            const { userSelect } = action
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelect
            })
        }
        default: break

    }
    let { taskDetail } = yield select(state => state.TaskPopupReducer)
    let listUserId = taskDetail.assigness?.map((user, index) => { return user.id })
    taskDetail = {...taskDetail, listUserAsign: listUserId}

    yield put({
        type:UPDATE_TASK_API,
        taskUpdated:taskDetail
    })
}

export function* followHandleBeforeUpdateTask() {
    yield takeLatest(HANDLE_BEFORE_UPDATE_TASK_SAGA, handleBeforeUpdateTask)
}