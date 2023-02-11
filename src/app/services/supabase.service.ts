import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment'
import {createClient, SupabaseClient,  AuthSession} from "@supabase/supabase-js";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getRecords() {
    const {data, error} = await this.supabase
      .from('Records')
      .select('*')
    if (error)
      return {
        "error": true,
        "message": error.message
      }
    return data
  }

  async getRecordsOnId(id: number) {
    const {data, error} = await this.supabase
      .from('Records')
      .select('*')
      .eq('id', id)
    if (error)
      return {
        "error": true,
        "message": error.message
      }
    return data
  }

  async OnDelete(id: number) {
    const {data, error} = await this.supabase
      .from('Records')
      .delete()
      .eq('id', id)
    if (error)
      return {
        "error": true,
        "message": error.message
      }
    return {
      "message": `object ${id} delete`,
      data
    }
  }

  async OnInsert(date: string, title: string, text: string, image?: string, author_id? :string) {
    const {data, error} = await this.supabase
      .from('Records')
      .insert([
        {date,title,text,image,author_id}
      ])
  }

  async OnUpdate(id:number,date: string, title: string, text: string, image?: string) {
    const {data, error} = await this.supabase
      .from('Records')
      .update([
        {date,title,text,image}
      ])
      .eq('id',id)
  }

}
