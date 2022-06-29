import { SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs"


export const signinAction = (email,password) => {
    return {
        type: SIGNIN_API,
        userLogin:{
            email:email,
            password:password
        }
    }
}