import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrService {

  constructor() { }

  private _HadlerError : string

  get Erorr()
  {
    return this._HadlerError
  }

  AuthError(msg: string)
  {
    this._HadlerError = msg
  }
}
