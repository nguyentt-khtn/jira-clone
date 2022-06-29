import axios from "axios"
import { ACCESS_TOKEN, DOMAIN_CYBERBUGS } from "../util/constants/DomainSetting"

export class BaseService{

    put = (url, data) => {
        return axios({
            url:`${DOMAIN_CYBERBUGS}/${url}`,
            method:'PUT',
            data:data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    post = (url, data) => {
        return axios({
            url:`${DOMAIN_CYBERBUGS}/${url}`,
            method:'POST',
            data:data,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    delete = (url) => {
        return axios({
            url:`${DOMAIN_CYBERBUGS}/${url}`,
            method:'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
    get = (url) => {
        return axios({
            url:`${DOMAIN_CYBERBUGS}/${url}`,
            method:'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        })
    }
}