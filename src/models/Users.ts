export interface userModel {
  _id?: string;
  username?: string;
  password?: string;
}
export interface usersModel {
  user: userModel;
}