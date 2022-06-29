import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { GET_PROJECT_API, CREATE_PROJECT_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';

function CreateProject(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props;

    const array = useSelector(state => state.ProjectCategoryReducer.arrayProject)

    const editorRef = useRef(null);

    const dispatch = useDispatch()

    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', editorRef.current.getContent())
        }
    }

    useEffect(() => {
        dispatch({ type: GET_PROJECT_API })
    }, [])

    return (
        <div className='container mt-5'>
            <h2>CreateProject</h2>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        onInit={(evt, editor) => { editorRef.current = editor }}
                        initialValue=""
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
                    />
                </div>
                <div className='form-group'>
                    <select name='categoryId' className='form-control'>
                        {array.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button onClick={log} className='btn btn-primary' type='submit' >Create Project</button>
            </form>
        </div>
    )
}

const createProject = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrayProject[0]?.id
        }
    },
    validationSchema: Yup.object().shape({
        // email:Yup.string().required('Email is required').email('Email is invalid'),
        // password:Yup.string().min(6,'Password have to min 6 character').max(10,'Password have to max 10 character')
    })
    ,
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_API,
            data: {
                projectName: values.projectName,
                description: values.description,
                categoryId: values.categoryId
            }
        })
    },
    displayName: 'Create Project',
})(CreateProject);

const mapStateToProps = state => {
    return {
        arrayProject: state.ProjectCategoryReducer.arrayProject
    }
}

export default connect(mapStateToProps)(createProject)
