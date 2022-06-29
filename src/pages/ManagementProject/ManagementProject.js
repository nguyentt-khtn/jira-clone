import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag, Avatar, Popover, AutoComplete } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_API } from '../../redux/constants/Cyberbugs/Cyberbugs';
import parser from 'html-react-parser'
import { DELETE_PROJECT_API, FORM_ON, SEND_EDIT_PROJECT, VISIBLE_ON } from '../../redux/constants/Modal/PopupModal';
import FormEditProject from '../../components/Cyberbugs/Form/FormEditProject';
import { Popconfirm } from 'antd';
import { DELETE_USER_FROM_PROJECT_API, GET_ASSIGN_USER_API, GET_USER_API } from '../../redux/constants/Cyberbugs/UserConstants';
import { NavLink } from 'react-router-dom';

export default function ManagementProject(props) {

    const dispatch = useDispatch()

    const searchRef = useRef(null)

    const { Column, ColumnGroup } = Table;

    const [valueState, setValueState] = useState('')

    const list = useSelector(state => state.GetProjectReducer.projectList)

    const { arraySearch } = useSelector(state => state.UserReducer)

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_API
        })
    }, [])

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null
    })

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend']
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record) => {
                return <NavLink to={`/projectDetail/${record.id}`}>{record.projectName}</NavLink>
            },
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => {
                let stringDes = parser(text)
                return <div>
                    {stringDes}
                </div>
            },
            filters: [
                { text: 'London', value: 'London' },
                { text: 'New York', value: 'New York' },
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <div>
                    <Tag color="cyan">{record.creator.name}</Tag>
                </div>
            },
        },
        {
            title: 'Member',
            key: 'members',
            render: (text, record, index) => {
                return <>
                    {record.members?.slice(0, 3).map((item, i) => {
                        return (
                            <Popover key={i} placement='top' title='Members' content={() => {
                                return <Table dataSource={record.members} style={{ width: '350px' }}>

                                    <Column title="ID" dataIndex='userId' key='userId' />
                                    <Column
                                        title="Avatar"
                                        key="avatar"
                                        render={(text, record) => {
                                            return <Avatar src={record.avatar} />
                                        }}
                                    />
                                    <Column title="Name" dataIndex="name" key="name" />
                                    <Column
                                        title="Action"
                                        key="action"
                                        render={(text, recordButton) => (

                                            <Space size="middle">
                                                <Button className='text-danger' onClick={() => {
                                                    dispatch({
                                                        type: DELETE_USER_FROM_PROJECT_API,
                                                        data: {
                                                            projectId: record.id,
                                                            userId: recordButton.userId
                                                        }
                                                    })
                                                }}>Delete</Button>
                                            </Space>
                                        )}
                                    />
                                </Table>
                            }}>
                                <Avatar src={item.avatar} />
                            </Popover>
                        )
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="rightTop" title={'Add user'}
                        content={() => {
                            return <AutoComplete
                                options={arraySearch?.map((item, index) => {
                                    return { label: item.name, value: item.userId.toString() }
                                })}
                                value={valueState}
                                onChange={(text) => {
                                    setValueState(text)
                                }}
                                onSelect={(value, option) => {
                                    setValueState(option.label)
                                    dispatch({
                                        type: GET_ASSIGN_USER_API,
                                        data: {
                                            projectId: record.id,
                                            userId: option.value
                                        }
                                    })
                                }}
                                style={{ width: '100px' }}
                                onSearch={(value) => {
                                    if(searchRef.current){
                                        clearTimeout(searchRef.current)
                                    }
                                    searchRef.current = setTimeout(()=>{
                                        dispatch({ type: GET_USER_API, id: value })
                                    },300)
                                }}
                            />
                        }}
                        trigger="click">
                        <Button shape='circle'>+</Button>
                    </Popover>
                </>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Popconfirm
                        placement="top"
                        title={'Are you sure delete this project?'}
                        onConfirm={() => { dispatch({ type: DELETE_PROJECT_API, id: record.id }) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a><DeleteOutlined /></a>
                    </Popconfirm>
                    <a onClick={() => {
                        dispatch({ type: FORM_ON, component: <FormEditProject /> ,title:'Edit Project' })
                        dispatch({ type: SEND_EDIT_PROJECT, project: record })
                    }}><EditFilled /></a>
                </Space>
            ),
        },
    ];

    return (
        <div className='container mt-5'>
            <h1>Project Management</h1>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey='id' dataSource={list} onChange={handleChange} />
        </div>
    )
}
