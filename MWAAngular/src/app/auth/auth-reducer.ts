import { IAuthState } from "./auth-state";
import { LOG_IN, LOG_OUT } from './auth-actions';

const initialState : IAuthState = {
    userinfo:{
        userid:'',
        jwt:'',
        username:''
    }
}

function login(state,action):IAuthState{
    return Object.assign({}, state, {userinfo:action.payload})
}
function logout(state,action):IAuthState{
    return Object.assign({}, state, {userinfo:{userid:'', username:''}})
}

export function reducer(state: IAuthState = initialState, action){
    switch(action.type){
        case LOG_IN: return login(state, action);
        case LOG_OUT: return logout(state, action);
        default: return initialState;
    }
}