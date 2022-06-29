import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from '../../../util/constants/DomainSetting';
import { GET_ALL_PROJECT_API } from '../../constants/Cyberbugs/Cyberbugs';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';
import { EDIT_PROJECT_API } from '../../constants/Modal/PopupModal';

function* editProject(action) {
    
    yield put({ type: ON_LOADING })

    yield delay(500)

    try {
        const { data, status } = yield call(() => cyberbugsService.editProject(action.projectEdited))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type:GET_ALL_PROJECT_API})
            yield put({ type: OFF_LOADING })
        }
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({ type: OFF_LOADING })
}

export function* followEditProject() {
    yield takeLatest(EDIT_PROJECT_API, editProject)
}

