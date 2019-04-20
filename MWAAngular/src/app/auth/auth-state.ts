export interface IUserInfo{
    userid:string,
    username:string,
    photo?:string,
};

export interface IAuthState{
    userinfo:IUserInfo;
}