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

  url: string
  private supabase: SupabaseClient
  isAuth$ = interval(2000)

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }


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



  signInAPI(email:string, pass:string){
    this.url = 'https://mzyrvwlnsrixkgapzcgz.supabase.co/auth/v1/token?grant_type=password'
    const headers = new HttpHeaders()
      .set("apikey", environment.supabaseKey)
      .set('content-type', 'application/json');
    const body = {email: email, password:pass};
    return this.http.post<IAuthData>(this.url,body,{headers})

  }

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
