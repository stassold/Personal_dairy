import { Injectable } from '@angular/core';
import {AuthSession, createClient, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAuthData} from "../models/auth-data";
import {interval} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService {
  // Cервис для аутенфикации на бэкэнде Supabase

  url: string
  private supabase: SupabaseClient
  // Observable который используется для проверки аутефицированны ли в данным момент, проверяет каждые 2 секунды, используется для изменения содержимого
  isAuth$ = interval(2000)

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Метод через промис используемый для регистрации на backend
  async signUp(email:string,password:string){
    let { data, error } = await this.supabase.auth.signUp({
      email,password
    })
    if (error)
      return {
        "error": true,
        "message": error.message
      }
    return data
  }


  // Метод используемый для входа на сайт используя http client с необходимами  загловками и телом
  signInAPI(email:string, pass:string){
    this.url = 'https://mzyrvwlnsrixkgapzcgz.supabase.co/auth/v1/token?grant_type=password'
    const headers = new HttpHeaders()
      .set("apikey", environment.supabaseKey)
      .set('content-type', 'application/json');
    const body = {email: email, password:pass};
    return this.http.post<IAuthData>(this.url,body,{headers})

  }

  // Метод используемый для выхода на сайте используя http client с необходимами загловками и телом
  LogOutAPI(user_token:string | null){
    this.url = 'https://mzyrvwlnsrixkgapzcgz.supabase.co/auth/v1/logout'
    const headers = new HttpHeaders()
      .set("apikey", environment.supabaseKey)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`);
    const body = {};
    return this.http.post(this.url,body,{headers})
  }



}
