import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { GET_ALL_COMMENT_API } from '../../redux/constants/Cyberbugs/CommentConstant'
import { GET_DETAIL_API, UPDATE_STATUS_API } from '../../redux/constants/Cyberbugs/TaskConstants'

export default function Content(props) {
    const dispatch = useDispatch()
    const { list, projectId } = props
    const handleDragEnd = (result) => {
        let {destination, source, draggableId} = result
        if(!destination){
            return
        }
        if(source.index === destination.index && source.droppableId === destination.droppableId){
            return
        }
        dispatch({
            type:UPDATE_STATUS_API,
            statusUpdated:{
                taskId: draggableId,
                statusId:destination.droppableId
            },
            projectId:projectId
        })
    }
    const renderTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {list?.map((item, index) => {
                return <Droppable droppableId={item.statusId.toString()}>
                    {(provided) => {
                        return <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="card pb-2" style={{ width: '17rem', height: 'auto' }} >
                            <div className="card-header">
                                {item.statusName}
                            </div>
                            <ul

                                className="list-group list-group-flush">
                                {item.lstTaskDeTail?.map((task, ind) => {
                                    return <Draggable index={ind} key={task.taskId.toString()} draggableId={task.taskId.toString()}>
                                        {(provided) => {
                                            return <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={ind} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                    dispatch({ type: GET_DETAIL_API, detailId: task.taskId })
                                                    dispatch({
                                                        type: GET_ALL_COMMENT_API,
                                                        taskId: task.taskId
                                                    })
                                                }}>
                                                <p>{task.taskName}</p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left text-primary">
                                                        {task.priorityTask.priority}
                                                    </div>
                                                    <div className="block-right">
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            {task.assigness.map((mem, inde) => {
                                                                return <div key={inde} className="avatar">
                                                                    <img src={mem.avatar} alt={mem.avatar} />
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        }}
                                    </Draggable>
                                })}
                                {provided.placeholder}
                            </ul>

                        </div>
                    }}

                </Droppable>
            })}
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderTaskList()}
        </div>
    )
}

// {/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     BACKLOG 3
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
//                         <p>
//                             Each issue has a single reporter but can have multiple
//                             assignees
//                         </p>
//                         <div className="block" style={{ display: 'flex' }}>
//                             <div className="block-left">
//                                 <i className="fa fa-bookmark" />
//                                 <i className="fa fa-arrow-up" />
//                             </div>
//                             <div className="block-right">
//                                 <div className="avatar-group" style={{ display: 'flex' }}>
//                                     <div className="avatar">
//                                         <img src={require('../../assets/img/download (1).jfif')} alt='xyz' />
//                                     </div>
//                                     <div className="avatar">
//                                         <img src={require('../../assets/img/download (2).jfif')} alt='xyz' />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
//                     <li className="list-group-item">
//                         <p>
//                             Each issue has a single reporter but can have multiple
//                             assignees
//                         </p>
//                         <div className="block" style={{ display: 'flex' }}>
//                             <div className="block-left">
//                                 <i className="fa fa-check-square" />
//                                 <i className="fa fa-arrow-up" />
//                             </div>
//                             <div className="block-right">
//                                 <div className="avatar-group" style={{ display: 'flex' }}>
//                                     <div className="avatar">
//                                         <img src={require('../../assets/img/download (1).jfif')} alt='xyz' />
//                                     </div>
//                                     <div className="avatar">
//                                         <img src={require('../../assets/img/download (2).jfif')} alt='xyz' />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
//                     <li className="list-group-item">Vestibulum at eros</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     SELECTED FOR DEVELOPMENT 2
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     IN PROGRESS 2
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                 </ul>
//             </div>
//             <div className="card" style={{ width: '17rem', height: '25rem' }}>
//                 <div className="card-header">
//                     DONE 3
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">Cras justo odio</li>
//                     <li className="list-group-item">Dapibus ac facilisis in</li>
//                     <li className="list-group-item">Vestibulum at eros</li>
//                 </ul>
//             </div> */}