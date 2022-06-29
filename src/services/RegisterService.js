import { BaseService } from "./BaseService";

export class RegisterService extends BaseService {

    constructor() {
        super()
    }

    signupUser = (data) => {
        return this.post(`Users/signup`,data)
    }

    deleteUser = (id) => {
        return this.delete(`Users/deleteUser?id=${id}`)
    }

    editUser = (userEdit) => {
        return this.put(`Users/editUser`,userEdit)
    }
}

export const registerService = new RegisterService()