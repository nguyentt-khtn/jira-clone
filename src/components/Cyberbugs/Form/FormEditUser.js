import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { withFormik } from 'formik';
import { connect, useDispatch } from 'react-redux'
import * as Yup from 'yup';
import React, { useEffect } from 'react'
import { SET_SUBMIT_CREATE_TASK } from '../../../redux/constants/Cyberbugs/TaskConstants';
import { EDIT_USER_API } from '../../../redux/constants/Cyberbugs/RegisterConstants';
import { FORM_OFF, VISIBLE_OFF } from '../../../redux/constants/Modal/PopupModal';

function FormEditUser(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type:SET_SUBMIT_CREATE_TASK,
            submitEvent:handleSubmit
        })
    }, [])
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
                <h3>EDIT USER</h3>
                <div className='form-group'>
                    <div className='my-2'>
                        <Input name='email' type='email' value={values.email} onChange={handleChange} size="large" placeholder="Email" prefix={<MailOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.email}</div>
                    <div className='my-2'>
                        <Input name='passWord' type='password' value={values.passWord} onChange={handleChange} size="large" placeholder="Password" prefix={<LockOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.passWord}</div>
                    <div className='my-2'>
                        <Input name='phoneNumber' type='tel' value={values.phoneNumber} onChange={handleChange} size="large" placeholder="Phone number" prefix={<PhoneOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.phoneNumber}</div>
                    <div className='my-2'>
                        <Input name='name' type='text' value={values.name} onChange={handleChange} size="large" placeholder="Name" prefix={<UserOutlined />} />
                    </div>
                    <div className='text-danger'>{errors.name}</div>
                </div>
            </div>
            <button type='submit'>qwesd</button>
        </form>
    )
}
const editUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        let {email,name,phoneNumber,userId} = props.userEdit
        return {
            passWord: '',
            email: email,
            name: name,
            phoneNumber: phoneNumber,
            id: userId,
        }
    },
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
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type:EDIT_USER_API,
            userEdit:values
        })
        props.dispatch({
            type:VISIBLE_OFF
        })
    },

    displayName: 'editUserForm',
})(FormEditUser);

const mapStateToProps = state => {
    return {
        userEdit: state.EditUserReducer.userEdit
    }
}

export default connect(mapStateToProps)(editUserForm) 