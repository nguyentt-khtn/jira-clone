import { BaseService } from "./BaseService"

export class ProjectService extends BaseService {

    constructor(){
        super();
    }

    deleteProject = (id) => {
        return this.delete(`/Project/deleteProject?projectId=${id}`)
    }

    getUserService = (id) => {
        return this.get(`Users/getUser?keyword=${id}`)
    }

    getAssignUser = (data) => {
        return this.post('Project/assignUserProject',data)
    }
    
    deleteUserFromProject = (data) => {
        return this.post('Project/removeUserFromProject',data)
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }

    getAllProject = () => {
        return this.get('Project/getAllProject')
    }

    getTaskType = () => {
        return this.get('TaskType/getAll')
    }

    getPriority = () => {
        return this.get('Priority/getAll')
    }

    getAllUser = () => {
        return this.get('Users/getUser')
    }

    getStatus = () => {
        return this.get('Status/getAll')
    }

    createTask = (taskObject) => {
        return this.post('Project/createTask',taskObject)
    }

    getUserById = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
    getTaskDetail = (detailId) => {
        return this.get(`Project/getTaskDetail?taskId=${detailId}`)
    }
    updateTask = (task) => {
        return this.post(`Project/updateTask`,task)
    }
    updateStatus = (task) => {
        return this.put(`Project/updateStatus`,task)
    }
}

export const projectService = new ProjectService()