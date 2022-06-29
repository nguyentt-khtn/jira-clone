import { OFF_LOADING, ON_LOADING } from "../constants/LoadingConstants/LoadingConstants"

const initialState = {
    loading: false
}

export default (state = initialState, action) => {

    switch (action.type) {

        case ON_LOADING:{
            state.loading = true;
            return { ...state }
        }

        case OFF_LOADING:{
            state.loading = false;
            return { ...state }
        }
        
        default: return {...state}
    } 
}