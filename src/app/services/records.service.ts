import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecords } from './../models/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  url: string = 'https://my-json-server.typicode.com/stassold/DB_personal_diary/posts';


  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<IRecords[]>(this.url);
  }

}
