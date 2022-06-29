import { combineReducers, createStore, applyMiddleware } from 'redux'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga'
import LoadingReducer from './reducers/LoadingReducer'
import { UserReducer } from './reducers/UserReducer'
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer'
import { GetProjectReducer } from './reducers/GetProjectReducer'
import { PopupModalReducer } from './reducers/PopupModalReducer'
import { ProjectEditReducer } from './reducers/ProjectEditReducer'
import { TaskReducer } from './reducers/TaskReducer'
import { TaskPopupReducer } from './reducers/TaskPropupReducer'
import { CommentReducer } from './reducers/CommentReducer'
import { EditUserReducer } from './reducers/EditUserReducer'

const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
    LoadingReducer,
    UserReducer,
    ProjectCategoryReducer,
    GetProjectReducer,
    PopupModalReducer,
    ProjectEditReducer,
    TaskReducer,
    TaskPopupReducer,
    CommentReducer,
    EditUserReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga))

middleWareSaga.run(rootSaga)

export default store