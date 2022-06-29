import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { VISIBLE_OFF, VISIBLE_ON } from '../../redux/constants/Modal/PopupModal';

export default function PopupModal() {

    const { visible, componentContent, callbackSubmit, title } = useSelector(state => state.PopupModalReducer)

    const dispatch = useDispatch()

    //const [state, setState] = useState({ visible: visibleRedux, childrenDrawer: false })

    const showDrawer = () => {
        dispatch({ type: VISIBLE_ON })
    };

    const onClose = () => {
        dispatch({ type: VISIBLE_OFF })
    };

    return (
        <>
            <Drawer
                title={title}
                width={520}
                onClose={onClose}
                visible={visible}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={onClose} style={{ marginRight: '8px' }}>Cancel</Button>
                        <Button onClick={() => { callbackSubmit() }} style={{ marginRight: '8px' }} type='primary'>Submit</Button>
                    </div>
                }
            >
                {componentContent}
            </Drawer>
        </>
    )
}
