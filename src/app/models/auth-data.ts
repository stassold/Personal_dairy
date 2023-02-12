import {IUser} from "./user";
// Модель которую мы получаем с backend
export interface IAuthData {
  access_token :string,
  user : IUser
}

