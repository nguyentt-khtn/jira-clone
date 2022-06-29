import React from 'react'
import { useDispatch } from 'react-redux'
import { OPEN_CREATE_TASK } from '../../redux/constants/Modal/PopupModal'
import FormCreateTask from './FormTask/FormCreateTask'

export default function Sidebar() {
    const dispatch = useDispatch()
    return (
        <div className="sideBar">
            <div className="sideBar-top">
                <div className="sideBar-icon">
                    <i className="fab fa-jira" />
                </div>
                <div className="sideBar-icon" style={{ cursor: 'pointer' }} onClick={() => {
                    dispatch({
                        type: OPEN_CREATE_TASK,
                        component: <FormCreateTask />
                    })
                }
                }>
                    <i className="fa fa-plus" />
                    <span className="title"> CREATE ISSUES</span>
                </div>
                <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-search" />
                    <span className="title"> SEARCH ISSUES</span>
                </div>
            </div>
            <div className="sideBar-bottom">
                <div className="sideBar-icon">
                    <i className="fa fa-question-circle" />
                    <span className="title"> ABOUT</span>
                </div>
            </div>
        </div>
    )
}
