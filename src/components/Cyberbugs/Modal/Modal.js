import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import parser from 'html-react-parser'
import { CHANGE_TASK, GET_PRIORITY_API, GET_STATUS_API, GET_TASK_TYPE_API, HANDLE_BEFORE_UPDATE_TASK_SAGA } from '../../../redux/constants/Cyberbugs/TaskConstants'
import { Popconfirm, Select } from 'antd';
import { CHANGE_ASSIGNESS, REMOVE_ASSIGNESS } from '../../../redux/constants/Modal/PopupModal';
import { DELETE_COMMENT_API, EDIT_COMMENT_API, INSERT_COMMENT_API } from '../../../redux/constants/Cyberbugs/CommentConstant';
import { USER_LOGIN } from '../../../util/constants/DomainSetting';
import { notificationFunction } from '../../../util/notification/NotificationCyberbug';

export default function Modal(props) {
    const { taskDetail } = useSelector(state => state.TaskPopupReducer)
    const dispatch = useDispatch()
    const { listStatus, listPriority, listTaskType } = useSelector(state => state.TaskReducer)
    const { arrayProjectDetail } = useSelector(state => state.GetProjectReducer)
    const [visibleDes, setVisibleDes] = useState(false)
    const [visibleComment, setVisibleComment] = useState(false)
    const [flagEditInsert, setFlagEditInsert] = useState(true)
    const [content, setContent] = useState(taskDetail.description)
    const [comment, setComment] = useState('')
    const [editComment, setEditComment] = useState({
        content: '',
        idComment: ''
    })
    const [prevContent, setPrevContent] = useState(taskDetail.description)
    const { listComment } = useSelector(state => state.CommentReducer)
    const renderTime = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetail
        const max = Number(timeTrackingRemaining) + Number(timeTrackingSpent)
        const percent = Number(timeTrackingSpent) / max * 100

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={0} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <input className='form-control' name='timeTrackingSpent' onChange={(e) => { handleChange(e) }} />
                </div>
                <div className='col-6'>
                    <input className='form-control' name='timeTrackingRemaining' onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
        </div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch({
            type: HANDLE_BEFORE_UPDATE_TASK_SAGA,
            actionType: CHANGE_TASK,
            name,
            value
        })
    }

    const renderComment = () => {
        return <div>
            {visibleComment ? <div><Editor
                name='comment'
                //value={editComment}
                //onInit={(evt, editor) => editorRef.current = editor}
                initialValue={editComment.content}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={(content, editor) => {
                    setComment(content)
                }}
            />
                <button className='btn btn-primary m-2' onClick={() => {
                    setVisibleComment(false)
                    let thisComment = comment
                    if (thisComment === '') {
                        setVisibleComment(false)
                        return
                    }
                    if (flagEditInsert) {
                        //dispatch insert
                        dispatch({
                            type: INSERT_COMMENT_API,
                            comment: {
                                taskId: taskDetail.taskId,
                                contentComment: thisComment
                            }
                        })
                    } else {
                        //dispatch edit
                        dispatch({
                            type: EDIT_COMMENT_API,
                            idComment: editComment.idComment,
                            contentComment: thisComment,
                            taskId: taskDetail.taskId
                        })
                        setEditComment({
                            contentComment: '',
                            idComment: ''
                        })
                        setFlagEditInsert(true)
                    }
                    setComment('')
                }}>Save</button>
                <button className='btn btn-danger m-2' onClick={() => {
                    setVisibleComment(false)
                    setEditComment({
                        contentComment: '',
                        idComment: ''
                    })
                    setFlagEditInsert(true)
                }}>Close</button>
            </div>
                : <div onClick={() => { setVisibleComment(true) }} className="input-comment" style={{ minWidth: '500px' }}>
                    <input type="text" placeholder="Add a comment ..." />
                </div>
            }
        </div>
    }

    const renderDescription = () => {
        const descriptionParser = parser(taskDetail.description)
        return <div> {visibleDes ? <div><Editor
            name='description'
            //value={values.description}
            //onInit={(evt, editor) => editorRef.current = editor}
            initialValue={taskDetail.description}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={(content, editor) => {
                setContent(content)
            }}
        />
            <button className='btn btn-primary m-2' onClick={() => {
                setVisibleDes(false)
                dispatch({
                    type: HANDLE_BEFORE_UPDATE_TASK_SAGA,
                    actionType: CHANGE_TASK,
                    name: 'description',
                    value: content
                })
            }}>Save</button>
            <button className='btn btn-danger m-2' onClick={() => {
                setVisibleDes(false)
                dispatch({
                    type: HANDLE_BEFORE_UPDATE_TASK_SAGA,
                    actionType: CHANGE_TASK,
                    name: 'description',
                    value: prevContent
                })
            }}>Close</button>
        </div>
            : <div onClick={() => {
                setVisibleDes(true)
                setPrevContent(content)
            }}>{descriptionParser}</div>}
        </div>
    }

    let thisUser = JSON.parse(localStorage.getItem(USER_LOGIN))

    useEffect(() => {
        dispatch({ type: GET_STATUS_API })
        dispatch({ type: GET_PRIORITY_API })
        dispatch({ type: GET_TASK_TYPE_API })
    }, [])
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select name='typeId' value={taskDetail.typeId} onChange={(e) => { handleChange(e) }}>
                                {listTaskType?.map((type, index) => {
                                    return <option key={index} value={type.id}>{type.taskType}</option>
                                })}
                            </select>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        <p>
                                            {renderDescription()}
                                        </p>
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={thisUser.avatar} alt='xyz' />
                                            </div>
                                            {renderComment()}

                                        </div>
                                        <div className="lastest-comment mt-3">
                                            {listComment?.map((comment, index) => {
                                                return <div key={index} className="comment-item mt-1">
                                                    <div className="display-comment" style={{ display: 'flex' }}>

                                                        <div className="avatar">
                                                            <img src={comment.user.avatar} alt={comment.user.avatar} />
                                                            <p>{comment.user.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className='pl-2 pt-1' style={{ marginBottom: 5, minWidth: '500px' }}>
                                                                {parser(comment.contentComment)}
                                                            </p>
                                                            <div>
                                                                <span style={{ color: '#929398', cursor: 'pointer' }} className='text-primary' onClick={() => {
                                                                    if (comment.user.userId === thisUser.id) {
                                                                        setEditComment({
                                                                            idComment: comment.id,
                                                                            content: comment.contentComment
                                                                        })
                                                                        setVisibleComment(true)
                                                                        setFlagEditInsert(false)
                                                                    } else {
                                                                        notificationFunction('warning', `Oops! You don't have permission to edit comments`)
                                                                        return
                                                                    }
                                                                }}>Edit</span>•
                                                                <Popconfirm
                                                                    style={{ color: '#929398', cursor: 'pointer' }}
                                                                    className='text-danger'
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                    placement="right"
                                                                    title={'Are you sure delete this comment?'}
                                                                    onConfirm={() => {
                                                                        if (comment.user.userId === thisUser.id) {
                                                                            dispatch({ type: DELETE_COMMENT_API, idComment: comment.id, taskId: comment.taskId })
                                                                        } else {
                                                                            notificationFunction('warning', `Oops! You don't have permission to delete comments`)
                                                                            return
                                                                        }
                                                                    }}>Delete</Popconfirm>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" name='statusId' onChange={(e) => { handleChange(e) }}>
                                            {listStatus?.map((item, index) => {
                                                if (taskDetail.statusId === item.statusId) {
                                                    return <option key={index} selected value={item.statusId}>{item.statusName}</option>
                                                } else {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                }

                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {taskDetail.assigness?.map((user, index) => {
                                                return <div className='col-4' key={index}>
                                                    <div className="avatar">
                                                        <img src={user.avatar} alt={user.id} />
                                                    </div>
                                                    <p className="name">
                                                        {user.name}
                                                        <i className="fa fa-times text-danger" style={{ marginLeft: 5 }} onClick={() => {
                                                            dispatch({
                                                                type: HANDLE_BEFORE_UPDATE_TASK_SAGA,
                                                                actionType: REMOVE_ASSIGNESS,
                                                                userId: user.id
                                                            })
                                                        }} />
                                                    </p>
                                                </div>
                                            })}

                                            <div className='col-6'>
                                                <Select
                                                    name='lstUser'
                                                    style={{ width: '100%' }}
                                                    optionFilterProp='label'
                                                    value='Add more'
                                                    placeholder='Add more'
                                                    options={arrayProjectDetail.members?.filter(mem => {
                                                        let i = taskDetail.assigness?.findIndex(item => item.id === mem.userId)
                                                        if (i !== -1) {
                                                            return false
                                                        }
                                                        return true
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name }
                                                    })}
                                                    onSelect={(value) => {
                                                        let userSelect = arrayProjectDetail.members.find(mem => mem.userId == value)
                                                        userSelect = { ...userSelect, id: userSelect.userId }
                                                        dispatch({
                                                            type: HANDLE_BEFORE_UPDATE_TASK_SAGA,
                                                            actionType: CHANGE_ASSIGNESS,
                                                            userSelect
                                                        })
                                                    }}>

                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select value={taskDetail.priorityId} name='priorityId' onChange={(e) => { handleChange(e) }}>
                                            {listPriority?.map((pri, index) => {
                                                return <option key={index} value={pri.priorityId}>{pri.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" name='originalEstimate' onChange={(e) => { handleChange(e) }} className="estimate-hours" value={taskDetail.originalEstimate} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTime()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
