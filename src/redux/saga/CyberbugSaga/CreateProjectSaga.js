import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { CREATE_PROJECT, CREATE_PROJECT_API, GET_PROJECT, GET_PROJECT_API } from "../../constants/Cyberbugs/Cyberbugs";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';

function* createProject(action) {
    yield put({ type: ON_LOADING })

    yield delay(500)

    try {
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.data))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: OFF_LOADING })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({ type: OFF_LOADING })
}

export function* followCreateProject() {
    yield takeLatest(CREATE_PROJECT_API, createProject)
}