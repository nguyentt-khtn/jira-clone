import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { EDIT_PROJECT, EDIT_PROJECT_API } from '../../../redux/constants/Modal/PopupModal';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { GET_PROJECT_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';

function FormEditProject(props) {

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

        dispatch({ type: GET_PROJECT_API })
        dispatch({ type: EDIT_PROJECT, submitEvent: handleSubmit })
    }, [])

    const editorRef = useRef(null);

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', editorRef.current.getContent())
    }
    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4 form-group'>
                    <h5>ID</h5>
                    <input value={values.id} className='form-control' name='id' />
                </div>

                <div className='col-4 form-group'>
                    <h5>Name</h5>
                    <input onChange={handleChange} value={values.projectName} className='form-control' name='projectName' />
                </div>

                <div className='col-4 form-group'>
                    <h5>Category</h5>
                    <select onChange={handleChange} name='categoryId' value={values.categoryId} className='form-control'>
                        {array.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 form-group'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        value={values.description}
                        onInit={(evt, editor) => editorRef.current = editor }
                        initialValue={values.description}
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
            </div>
        </form>
    )
}

const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            description: props.projectEdit.description,
            categoryId: props.projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({
        // email:Yup.string().required('Email is required').email('Email is invalid'),
        // password:Yup.string().min(6,'Password have to min 6 character').max(10,'Password have to max 10 character')
    })
    ,
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({type:EDIT_PROJECT_API, projectEdited: values})
    },
    displayName: 'editProjectForm',
})(FormEditProject);

const mapStateToProps = state => {
    return {
        projectEdit: state.ProjectEditReducer.projectEdit
    }
}

export default connect(mapStateToProps)(editProjectForm)