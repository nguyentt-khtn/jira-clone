import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { GET_ALL_PROJECT_API } from '../../constants/Cyberbugs/Cyberbugs';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';
import { DELETE_PROJECT_API } from '../../constants/Modal/PopupModal';
import {projectService} from '../../../services/ProjectService'
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';

function* deleteProject(action) {
    
    yield put({ type: ON_LOADING })

    yield delay(500)

    try {
        const {data, status } = yield call(() => projectService.deleteProject(action.id))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type:GET_ALL_PROJECT_API})
            yield put({ type: OFF_LOADING })
            notificationFunction('success', 'Delete project success',`Project ${action.id} has been deleted`)
        }else notificationFunction('error', 'Delete project fail',`Project deleted fail`)
    } catch (err) {
        console.log(err.response.data)
        notificationFunction('error', 'Delete project fail',`Project deleted fail`)
    }

    yield put({ type: OFF_LOADING })
}

export function* followDeleteProject() {
    yield takeLatest(DELETE_PROJECT_API, deleteProject)
}