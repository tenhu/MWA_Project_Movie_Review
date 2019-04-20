export interface IUserInfo{
    jwt:string;
    userid:string,
    username:string,
    photo?:string,
};

export interface IAuthState{
    userinfo:IUserInfo;
}