import {all} from 'redux-saga/effects'
import * as Cyberbugs from './CyberbugSaga/UserCyberbugSaga'
import * as ProjectCyberbugSaga from './CyberbugSaga/ProjectCyberbugSaga'
import * as CreateProjectSaga from './CyberbugSaga/CreateProjectSaga'
import * as GetProjectSaga from './CyberbugSaga/GetProjectSaga'
import * as EditProjectSaga from './CyberbugSaga/EditProjectSaga'
import * as DeleteProjectSaga from './CyberbugSaga/DeleteProjectSaga'
import * as GetUserSaga from './CyberbugSaga/GetUserSaga'
import * as TaskSaga from './CyberbugSaga/TaskSaga'
import * as CommentSaga from './CyberbugSaga/CommentSaga'
import * as RegisterSaga from './CyberbugSaga/RegisterSaga'
import * as UserCyberbugSaga from './CyberbugSaga/UserCyberbugSaga'

export function * rootSaga(){

    yield all([
        Cyberbugs.followSignin(),
        ProjectCyberbugSaga.followGetProject(),
        CreateProjectSaga.followCreateProject(),
        GetProjectSaga.followGetAllProject(),
        EditProjectSaga.followEditProject(),
        DeleteProjectSaga.followDeleteProject(),
        GetUserSaga.followGetUser(),
        GetUserSaga.followGetAssignUser(),
        GetUserSaga.followDeleteUserFromProject(),
        GetProjectSaga.followGetProjectDetail(),
        GetProjectSaga.followGetAllProjectTask(),
        TaskSaga.followGetTaskTypeSaga(),
        TaskSaga.followGetPriority(),
        TaskSaga.followGetAllUser(),
        TaskSaga.followCreateTaskSaga(),
        TaskSaga.followGetStatusSaga(),
        TaskSaga.followGetUserById(),
        TaskSaga.followGetTaskDetail(),
        TaskSaga.followUpdateTask(),
        TaskSaga.followHandleBeforeUpdateTask(),
        TaskSaga.followUpdateStatus(),
        CommentSaga.followGetAllComment(),
        CommentSaga.followInsertComment(),
        CommentSaga.followDeleteComment(),
        CommentSaga.followEditComment(),
        RegisterSaga.followRegisterUser(),
        RegisterSaga.followDeleteUser(),
        UserCyberbugSaga.followEditUser()
    ])
}