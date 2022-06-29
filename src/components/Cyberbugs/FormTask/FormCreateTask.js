import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { EDIT_PROJECT, EDIT_PROJECT_API } from '../../../redux/constants/Modal/PopupModal';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { GET_ALL_PROJECT_TASK_API, GET_PROJECT_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { Select, Slider } from 'antd';
import { CREATE_TASK_API, GET_ALL_USER_API, GET_PRIORITY_API, GET_STATUS_API, GET_TASK_TYPE_API, GET_USER_BY_ID_API, SET_SUBMIT_CREATE_TASK } from '../../../redux/constants/Cyberbugs/TaskConstants';

function FormCreateTask(props) {

    const { Option } = Select;

    const { arrayProjectTask } = useSelector(state => state.GetProjectReducer)

    const { listTaskType, listPriority, listAllUser, listStatus, listUserById } = useSelector(state => state.TaskReducer)
   
    

    const [size, setSize] = useState('default');

    const [time, setTime] = useState({
        timeSpent: 0,
        timeRemaining: 0
    });

    const arraySelect = [];

    listUserById?.map((item, index) => {
        arraySelect.push({ value: item.userId, label: item.name })
    })

    function handleChangeSelect(value) {
    }

    const SelectSizesDemo = () => {
        const handleSizeChange = e => {
            setSize(e.target.value);
        };
    }
    const array = useSelector(state => state.ProjectCategoryReducer.arrayProject)

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_TASK_API })
        dispatch({ type: GET_TASK_TYPE_API })
        dispatch({ type: GET_PRIORITY_API })
        dispatch({ type: GET_ALL_USER_API })
        dispatch({ type: GET_STATUS_API })
        dispatch({ type: SET_SUBMIT_CREATE_TASK, submitEvent: handleSubmit })
    }, [])

    const editorRef = useRef(null);

    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-12 form-group'>
                    <p>Project</p>
                    <select name='projectId' className='form-control' onChange={(e) => {
                        setFieldValue('projectId', e.target.value)
                        dispatch({type:GET_USER_BY_ID_API, projectId: e.target.value})
                    }}>
                        {arrayProjectTask?.map((item, index) => {
                            return <option key={index} value={item.id}>{item.projectName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 form-group'>
                    <p>Task name</p>
                    <input className='form-control' name='taskName' onChange={handleChange} />
                </div>
                <div className='col-6 form-group'>
                    <p>Status</p>
                    <select name='statusId' onChange={handleChange} className='form-control'>
                        {listStatus?.map((item, index) => {
                            return <option key={index} value={item.statusId}>{item.statusName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 form-group'>
                    <p>Priority</p>
                    <select name='priorityId' onChange={handleChange} className='form-control'>
                        {listPriority?.map((item, index) => {
                            return <option key={index} value={item.priorityId}>{item.priority}</option>
                        })}
                    </select>
                </div>

                <div className='col-6 form-group'>
                    <p>Type Task</p>
                    <select name='typeId' onChange={handleChange} className='form-control'>
                        {listTaskType?.map((item, index) => {
                            return <option key={index} value={item.id}>{item.taskType}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 form-group' name='listUserAsign'>
                    <p>Assigner</p>
                    <Select
                        mode="multiple"
                        size={size}
                        placeholder="Please select"
                        options={arraySelect}
                        optionFilterProp='label'
                        onChange={(values) => {
                            setFieldValue('listUserAsign', values)
                        }}
                        style={{ width: '100%' }}
                    >
                    </Select>
                    <div className='row' style={{ marginTop: '12px' }}>
                        <div className='col-12 form-group'>
                            <p>Original Estimate</p>
                            <input className='form-control' type='number' name='originalEstimate' onChange={handleChange} defaultValue='0' min='0' />
                        </div>
                    </div>
                </div>
                <div className='col-6 form-group'>
                    <p>Time tracking</p>
                    <Slider defaultValue={time.timeSpent} value={time.timeSpent} max={Number(time.timeRemaining) + Number(time.timeSpent)} tooltipVisible />
                    <div className='row'>
                        <div className='col-6 text-left text-primary'>{time.timeSpent}h logged</div>
                        <div className='col-6 text-right text-primary'>{time.timeRemaining}h remaining</div>

                    </div>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <p>Spent</p>
                            <input className='form-control' defaultValue={time.timeSpent} min='0' type='number' name='timeTrackingSpent' onChange={(e) => {
                                setTime({
                                    ...time,
                                    timeSpent: e.target.value
                                })
                                setFieldValue('timeTrackingSpent', e.target.value)
                            }} />
                        </div>
                        <div className='col-6 form-group'>
                            <p>Remaining</p>
                            <input className='form-control' defaultValue={time.timeRemaining} min='0' type='number' name='timeTrackingRemaining' onChange={(e) => {
                                setTime({
                                    ...time,
                                    timeRemaining: e.target.value
                                })
                                setFieldValue('timeTrackingRemaining', e.target.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 form-group'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        onInit={(evt, editor) => editorRef.current = editor}
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
                            setFieldValue('description', content)
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

const createTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        let { arrayProjectTask, listTaskType, listPriority, listStatus } = props
        return {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: listStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrayProjectTask[0]?.id,
            typeId: listTaskType[0]?.typeId,
            priorityId: listPriority[0]?.priorityId
        }
    },
    validationSchema: Yup.object().shape({
        // email:Yup.string().required('Email is required').email('Email is invalid'),
        // password:Yup.string().min(6,'Password have to min 6 character').max(10,'Password have to max 10 character')
    })
    ,
    handleSubmit: (values, { props, setSubmitting }) => {
        // props.dispatch({ type: EDIT_PROJECT_API, projectEdited: values })
        props.dispatch({
            type: CREATE_TASK_API,
            data: values
        })
    },
    displayName: 'createTask',
})(FormCreateTask);

const mapStateToProps = state => {
    return {
        arrayProjectTask: state.GetProjectReducer.arrayProjectTask,
        listTaskType: state.TaskReducer.listTaskType,
        listPriority: state.TaskReducer.listPriority,
        listAllUser: state.TaskReducer.listAllUser,
        listStatus: state.TaskReducer.listStatus,
    }
}

export default connect(mapStateToProps)(createTask)
