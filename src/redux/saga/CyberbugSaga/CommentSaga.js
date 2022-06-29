import { takeLatest, put, call } from 'redux-saga/effects'
import { commentService } from '../../../services/CommentService'
import { STATUS_CODE } from '../../../util/constants/DomainSetting'
import { DELETE_COMMENT_API, EDIT_COMMENT_API, GET_ALL_COMMENT, GET_ALL_COMMENT_API, INSERT_COMMENT_API } from '../../constants/Cyberbugs/CommentConstant'
import { GET_DETAIL, GET_DETAIL_API } from '../../constants/Cyberbugs/TaskConstants'

//get All comment from backend
function* getAllComment(action) {
    try {
        const { data, status } = yield call(() => commentService.getAllComment(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                listComment: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followGetAllComment() {
    yield takeLatest(GET_ALL_COMMENT_API, getAllComment)
}

//insert comment to backend
function* insertComment(action) {
    try {
        const { data, status } = yield call(() => commentService.insertComment(action.comment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_API,
                detailId: action.comment.taskId
            })
            yield put({
                type: GET_ALL_COMMENT_API,
                taskId: action.comment.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followInsertComment() {
    yield takeLatest(INSERT_COMMENT_API, insertComment)
}

//delete comment
function* deleteComment(action) {
    try {
        const { data, status } = yield call(() => commentService.deleteComment(action.idComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_API,
                detailId: action.taskId
            })
            yield put({
                type: GET_ALL_COMMENT_API,
                taskId: action.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followDeleteComment() {
    yield takeLatest(DELETE_COMMENT_API, deleteComment)
}

//edit comment
function* editComment(action) {
    try {
        const { data, status } = yield call(() => commentService.editComment(action.idComment, action.contentComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_DETAIL_API,
                detailId: action.taskId
            })
            yield put({
                type: GET_ALL_COMMENT_API,
                taskId: action.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followEditComment() {
    yield takeLatest(EDIT_COMMENT_API, editComment)
}