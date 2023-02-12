import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrService {

  // Сервис созданный для обработки ошибок, чтобы клиентам отображать список ошибок на отдельном компоненте
  constructor() { }

  private _HadlerError : string

  // Метод получения текущей ошибки
  get Erorr()
  {
    return this._HadlerError
  }

  // Метод для диспатчка ошибки
  AuthError(msg: string)
  {
    this._HadlerError = msg
  }
}
