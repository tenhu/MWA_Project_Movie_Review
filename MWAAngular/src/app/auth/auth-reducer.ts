import { IAuthState } from "./auth-state";
import { LOG_IN, LOG_OUT } from './auth-actions';

const initialState : IAuthState = {
    userinfo:{
        userid:'',
        jwt:'',
        username:'',
        roles:[]
    }
}

function updateLocalToken(state){
    localStorage.setItem('access_token', state.userinfo.jwt);
}

function login(state,action):IAuthState{
    const newstate = Object.assign({}, state, {userinfo:action.payload})
    updateLocalToken(newstate);
    return newstate;
}

function logout(state, action):IAuthState{
    const newstate = Object.assign({}, state, {userinfo:{userid:'', username:'', roles:[], jwt:''}})    
    updateLocalToken(newstate);
    return newstate;
}

export function reducer(state: IAuthState = initialState, action){
    switch(action.type){
        case LOG_IN: return login(state, action);
        case LOG_OUT: return logout(state, action);
        default: return initialState;
    }
}