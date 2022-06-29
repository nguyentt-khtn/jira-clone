import axios from "axios"
import { ACCESS_TOKEN, DOMAIN_CYBERBUGS } from '../util/constants/DomainSetting'

export const cyberbugsService = {
    signinCyberBugs: (userLogin) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getProjectCategory: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method: 'GET',
        })
    },
    createProject: (data) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProject`,
            method: 'POST',
            data: data
        })
    },
    createProjectAuthorization: (data) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
            method: 'POST',
            data: data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    },
    getAllProjectAuthorization: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    },
    editProject: (projectEdited) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/updateProject?projectId=${projectEdited.id}`,
            method: 'PUT',
            data: projectEdited,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    },
}