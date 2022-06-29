import React, { useEffect } from 'react'
import Content from '../../../components/MainBoard/Content'
import Header from '../../../components/MainBoard/Header'
import Info from '../../../components/MainBoard/Info'
import { useDispatch, useSelector } from 'react-redux'
import parser from 'html-react-parser'
import { GET_PROJECT_DETAIL_API } from '../../../redux/constants/Cyberbugs/Cyberbugs'

export default function IndexCyberbugs(props) {

    const { arrayProjectDetail } = useSelector(state => state.GetProjectReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        const { projectId } = props.match.params
        dispatch({
            type: GET_PROJECT_DETAIL_API,
            projectId: projectId
        })
    }, [])

    return (
        <div className="main">
            <Header header={arrayProjectDetail.alias}/>
            <h3>{arrayProjectDetail.alias}</h3>
            {/* <div>{parser(arrayProjectDetail.description)}</div> */}
            <Info members={arrayProjectDetail.members}/>
            <Content list={arrayProjectDetail.lstTask} projectId={arrayProjectDetail.id} />
        </div>
    )
}
