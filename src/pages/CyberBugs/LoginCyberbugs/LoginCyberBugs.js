import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import {connect} from 'react-redux'
import {signinAction} from '../../../redux/actions/CyberbugsActions/CyberbugsActions'

function LoginCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center'>Login Cyberbugs</h3>
                <div className='d-flex' >
                    <Input onChange={handleChange} name='email' type='email' size="large" placeholder="Email" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className='d-flex mt-2' >
                    <Input onChange={handleChange} name='password' type='password' size="large" placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <div className='text-danger'>{errors.password}</div>
                <Button htmlType='submit' className='mt-2 text-white' style={{ minWidth: '225px', backgroundColor: 'tomato' }} >LOGIN </Button>
                <div className='social mt-2'>
                    <Button shape='circle' className='text-primary mr-2' icon={<FacebookOutlined />} />
                    <Button shape='circle' className='text-white bg-primary' icon={<TwitterOutlined />} />
                </div>
            </div>

        </form>
    )
}

const mapFormikToProps = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email:Yup.string().required('Email is required').email('Email is invalid'),
        password:Yup.string().min(6,'Password have to min 6 character').max(10,'Password have to max 10 character')
    })
    ,
    handleSubmit: (values, {props, setSubmitting }) => {
        props.dispatch(signinAction(values.email,values.password))
    },
    displayName: 'BasicForm',
})(LoginCyberBugs);

export default connect()(mapFormikToProps)
