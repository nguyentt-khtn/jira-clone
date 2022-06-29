import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { withFormik } from 'formik';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import React from 'react'
import { REGISTER_USER_API } from '../../../redux/constants/Cyberbugs/RegisterConstants';

function Register(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: window.innerHeight }}>
                <h3>SIGN UP</h3>
                <div className='form-group'>
                    <div className='my-2'>
                        <Input name='email' type='email' onChange={handleChange} size="large" placeholder="Email" prefix={<MailOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.email}</div>
                    <div className='my-2'>
                        <Input name='passWord' type='password' onChange={handleChange} size="large" placeholder="Password" prefix={<LockOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.passWord}</div>
                    <div className='my-2'>
                        <Input name='phoneNumber' type='tel' onChange={handleChange} size="large" placeholder="Phone number" prefix={<PhoneOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.phoneNumber}</div>
                    <div className='my-2'>
                        <Input name='name' type='text' onChange={handleChange} size="large" placeholder="Name" prefix={<UserOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.name}</div>
                </div>
                <Button htmlType='submit' className='mt-2 text-white' style={{ minWidth: '225px', backgroundColor: 'tomato' }} >Sign up </Button>
            </div>
        </form>
    )
}

const registerForm = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        phoneNumber: '',
        name: '',
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phoneNumber: Yup.string()
            .required('Phone is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        passWord: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters')
    }),
    handleSubmit: (values, {props, setSubmitting }) => {
        props.dispatch({
            type:REGISTER_USER_API,
            user: values
        })
    },

    displayName: 'registerForm',
})(Register);

export default connect()(registerForm) 
