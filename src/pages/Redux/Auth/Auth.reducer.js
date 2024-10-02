import {
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS
} from "./Auth.actionType";

const initialState={
    jwt:null,
    error: null,
    loading:false,
    user:null,
    searchUser:[]
}

export const authReducer= (state=initialState,action)=>{
    switch (action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST :
        case GET_PROFILE_REQUEST:
            return {...state, loading:true, error:null};
        case GET_PROFILE_SUCCESS :
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user:action.payload, error:null, loading:false};
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS :
            return {...state, jwt:action.payload, loading:false, error:null};
        case SEARCH_USER_SUCCESS :
            return {...state, searchUser: action.payload, loading: false, error: null};
        case REGISTER_FAILURE:
        case LOGIN_FAILURE :
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}