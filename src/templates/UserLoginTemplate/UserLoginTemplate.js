import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Layout } from 'antd';

const { Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {

    const [stateSize, setStateSize] = useState({
        width: window.innerWidth / 2,
        height: window.innerHeight
    })

    useEffect(() => {
        window.onresize = () => {
            setStateSize({
                width: Math.round(window.innerWidth / 2),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])

    let { Component, ...restProps } = props
    return <Route {...restProps} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={stateSize.width} style={{ height: stateSize.height, backgroundImage: `url(https://picsum.photos/${stateSize.width}/${stateSize.height}`, backgroundSize: '100%' }}></Sider>
                <Layout>
                    <Content><Component {...propsRoute} /></Content>
                </Layout>
            </Layout>
        </>
    }} />
}