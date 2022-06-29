import React from 'react'
import { Route } from 'react-router-dom'
import Menu from '../../components/Cyberbugs/Menu'
import Modal from '../../components/Cyberbugs/Modal/Modal'
import SearchModal from '../../components/Cyberbugs/Modal/SearchModal'
import Sidebar from '../../components/Cyberbugs/Sidebar'
import Content from '../../components/MainBoard/Content'
import Header from '../../components/MainBoard/Header'
import Info from '../../components/MainBoard/Info'

export default function CyberbugsTemplate(props) {
    let { Component, ...restProps } = props
    return <Route {...restProps} render={(propsRoute) => {
        return <>
            <div>
                <div className="jira">
                    {/* Sider Bar  */}
                    <Sidebar />
                    {/* Menu */}
                    <Menu />
                    {/* {/* {/* Main Board * /} * /} */}
                    <Component {...propsRoute} />
                </div>
                {/* Search Modal */}
                <SearchModal />
                {/* Info Modal */}
                <Modal />
            </div>

        </>
    }} />
}
