import { call, takeLatest, put } from 'redux-saga/effects'
import { projectService } from '../../../services/ProjectService';
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { GET_ALL_PROJECT_API } from '../../constants/Cyberbugs/Cyberbugs';
import { DELETE_USER_FROM_PROJECT_API, GET_ASSIGN_USER_API, GET_USER, GET_USER_API } from '../../constants/Cyberbugs/UserConstants';

function* getUser(action) {
    try {
        const { data, status } = yield call(() => projectService.getUserService(action.id))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_USER,
                data:data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* followGetUser() {
    yield takeLatest(GET_USER_API, getUser)
}




function* getAssignUser(action) {
    try {
        const { data, status } = yield call(() => projectService.getAssignUser(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type:GET_ALL_PROJECT_API})
        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* followGetAssignUser() {
    yield takeLatest(GET_ASSIGN_USER_API, getAssignUser)
}




function* deleteUserFromProject(action) {

    try {
        const { data, status } = yield call(() => projectService.deleteUserFromProject(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type:GET_ALL_PROJECT_API})
        }
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* followDeleteUserFromProject() {
    yield takeLatest(DELETE_USER_FROM_PROJECT_API, deleteUserFromProject)
}