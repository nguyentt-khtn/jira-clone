import React, { useEffect, useRef, useState } from 'react'
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { DeleteOutlined, EditFilled, SearchOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_API, SEND_EDIT_USER } from '../../redux/constants/Cyberbugs/RegisterConstants';
import { FORM_ON } from '../../redux/constants/Modal/PopupModal';
import FormEditUser from '../../components/Cyberbugs/Form/FormEditUser';
import { USER_LOGIN } from '../../util/constants/DomainSetting';
import { GET_USER_API } from '../../redux/constants/Cyberbugs/UserConstants';

export default function ManagementUser(props) {
    const dispatch = useDispatch()
    const { arraySearch } = useSelector(state => state.UserReducer)
    const searchRef = useRef(null)
    let listUser = []
    let i = 1
    for (let key in arraySearch) {
        let temp = { ...arraySearch[key], stt: i }
        i++
        listUser.push(temp)
    }
    useEffect(() => {
        dispatch({
            type: GET_USER_API,
            id: ''
        })
    }, [])
    const { searchInput } = props
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    })
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({ searchText: '' });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: '5%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '20%',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'action',
            key: 'action',
            width: '20%',
            render: (text, record, index) => {
                return <Space size="middle">
                    <Popconfirm
                        placement="top"
                        title={'Are you sure delete this user?'}
                        onConfirm={() => { dispatch({ type: DELETE_USER_API, userId: record.userId }) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a><DeleteOutlined /></a>
                    </Popconfirm>
                    <a onClick={() => {
                        dispatch({ type: FORM_ON, component: <FormEditUser />, title: 'Edit User' })
                        dispatch({ type: SEND_EDIT_USER, user: record })
                    }}><EditFilled /></a>
                </Space>
            }
        },
    ];
    let thisUser = JSON.parse(localStorage.getItem(USER_LOGIN))
    return (
        <div className='container-fluid mt-5'>
            <div className='row justify-content-right text-right d-flex flex-column'>
                <div>
                    <div className="avatar">
                        Hi !, <b>{thisUser.name}</b> <img src={thisUser.avatar} alt='xyz' />
                        <div class="btn-group">
                            <div style={{ marginRight: '130px' }}>
                                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </button>
                                <div className="dropdown-menu ">
                                    <NavLink className="dropdown-item" to="/login" onClick={() => {
                                        localStorage.clear()
                                    }}>Log out</NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5 ml-2 display-4'>
                <NavLink to='register'>Create User</NavLink>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <input className='form-control' placeholder='Search user' onChange={(e) => {
                        let { value } = e.target
                        if (searchRef.current) {
                            clearTimeout(searchRef.current)
                        }
                        searchRef.current = setTimeout(() => {
                            dispatch({
                                type: GET_USER_API,
                                id: value
                            })
                        }, 500)
                    }} />
                </div>
            </div>
            <div className='row mt-5'>
                <div className='container-fluid'>
                    <Table columns={columns} dataSource={listUser} />
                </div>
            </div>
        </div>
    )
}
