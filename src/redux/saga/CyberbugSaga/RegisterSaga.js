import { takeLatest, put, call } from 'redux-saga/effects'
import { registerService } from '../../../services/RegisterService'
import { STATUS_CODE } from '../../../util/constants/DomainSetting'
import { DELETE_USER_API, REGISTER_USER_API } from '../../constants/Cyberbugs/RegisterConstants'
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';
import { GET_ALL_USER_API } from '../../constants/Cyberbugs/TaskConstants';

//Register
function* registerUser(action) {
    try {
        const { data, status } = yield call(() => registerService.signupUser(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', 'You have sign up successfully')
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followRegisterUser() {
    yield takeLatest(REGISTER_USER_API, registerUser)
}

//delete user
function* deleteUser(action) {
    try {
        const { data, status } = yield call(() => registerService.deleteUser(action.userId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({type:GET_ALL_USER_API})
            notificationFunction('success', `You have delete user ${action.userId} successfully`)
        }
    } catch (err) {
        console.log(err.response.data)
        notificationFunction('error', `Delete user unsuccessfully`)
    }
}

export function* followDeleteUser() {
    yield takeLatest(DELETE_USER_API, deleteUser)
}

