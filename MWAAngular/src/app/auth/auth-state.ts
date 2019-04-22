export interface IUserInfo{
    jwt:string;
    userid:string,
    username:string,
    roles:string[],    
    photo?:string
};

export interface IAuthState{
    userinfo:IUserInfo;
}