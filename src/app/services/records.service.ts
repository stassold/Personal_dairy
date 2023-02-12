import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecords } from './../models/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  // Простенький бэкэнд по умолчанию, созданный с помощью db.json , используется на случай если Supabase перестанет будет доступной
  url: string = 'https://my-json-server.typicode.com/stassold/DB_personal_diary/posts';


  constructor(private http: HttpClient) { }
  // с помощью HttpClient создает запрос к нашему бэкенду и возвращаем Observable
  getRecords() {
    return this.http.get<IRecords[]>(this.url);
  }

}
