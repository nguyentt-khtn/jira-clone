import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { GET_PROJECT, GET_PROJECT_API } from "../../constants/Cyberbugs/Cyberbugs";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from '../../../util/constants/DomainSetting';

function* getProject(action) {

    // yield put({type:ON_LOADING})

    // yield delay(500)

    try {
        const { data, status } = yield call(() => cyberbugsService.getProjectCategory())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    // yield put({type:OFF_LOADING})
}

export function* followGetProject() {
    yield takeLatest(GET_PROJECT_API, getProject)
}