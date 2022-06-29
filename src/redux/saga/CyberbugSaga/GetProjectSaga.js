import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { GET_ALL_PROJECT, GET_ALL_PROJECT_API, GET_ALL_PROJECT_TASK, GET_ALL_PROJECT_TASK_API, GET_PROJECT, GET_PROJECT_API, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_API } from "../../constants/Cyberbugs/Cyberbugs";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { projectService } from '../../../services/ProjectService';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';
import { history } from '../../../util/lib/history';
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';
import { GET_USER_BY_ID_API } from '../../constants/Cyberbugs/TaskConstants';

function* getAllProject(action) {

    // yield put({type:ON_LOADING})

    // yield delay(500)

    try {
        const { data, status } = yield call(() => cyberbugsService.getAllProjectAuthorization())
        
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    // yield put({type:OFF_LOADING})
}

export function* followGetAllProject() {
    yield takeLatest(GET_ALL_PROJECT_API, getAllProject)
}

//******************************************************** */

function* getProjectDetail(action) {

    yield put({type:ON_LOADING})

    yield delay(500)

    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId))
    
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                data: data.content
            })
            yield put({type:OFF_LOADING})
        }
    } catch (err) {
        notificationFunction('error', 'Get project fail')
        console.log(err.response.data)
        history.push('/management')
    }
    yield put({type:OFF_LOADING})
}

export function* followGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetail)
}

/*************************************************** */

function* getAllProjectTask(action) {

    // yield put({type:ON_LOADING})

    // yield delay(500)

    try {
        const { data, status } = yield call(() => projectService.getAllProject())
        
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_TASK,
                data: data.content
            })
            yield put({
                type: GET_USER_BY_ID_API,
                projectId: data.content[0].id
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    // yield put({type:OFF_LOADING})
}

export function* followGetAllProjectTask() {
    yield takeLatest(GET_ALL_PROJECT_TASK_API, getAllProjectTask)
}