import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { cyberbugsService } from "../../../services/CyberbugsService";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from '../../../util/constants/DomainSetting';
import { SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";
import { USER } from '../../constants/Cyberbugs/UserConstants';
import { OFF_LOADING, ON_LOADING } from '../../constants/LoadingConstants/LoadingConstants';
import {history} from '../../../util/lib/history'
import { EDIT_USER_API } from '../../constants/Cyberbugs/RegisterConstants';
import { registerService } from '../../../services/RegisterService';
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';
import { GET_ALL_USER_API } from '../../constants/Cyberbugs/TaskConstants';

function* signin(action) {

    yield put({type:ON_LOADING})

    yield delay(500)

    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin))
        localStorage.setItem(ACCESS_TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))

        yield put({
            type:USER,
            user:data.content
        })

        history.push('/home')
        
    }catch(err){ 
        console.log(err.response.data)
    }

    yield put({type:OFF_LOADING})
}

export function* followSignin() {
    yield takeLatest(SIGNIN_API, signin)
}

//edit User
function* editUser(action) {

    try {
        const { data, status } = yield call(() => registerService.editUser(action.userEdit))
        if(status === STATUS_CODE.SUCCESS){
            yield put({type:GET_ALL_USER_API})
            notificationFunction('success',`You have been edited user ${action.userEdit.id}successfully`)
        }
        
    }catch(err){ 
        console.log(err.response.data)
        notificationFunction('error',`You edit unsuccessfully`)
    }
}

export function* followEditUser() {
    yield takeLatest(EDIT_USER_API, editUser)
}