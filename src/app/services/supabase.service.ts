import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment'
import {createClient, SupabaseClient,  AuthSession} from "@supabase/supabase-js";


@Injectable({
  providedIn: 'root'
})

// Сервис для работы с Backend сервиса Supabase
export class SupabaseService {
  // объявляем клиент сервиса Supabase
  private supabase: SupabaseClient

  constructor() {
    // Задаем параметры для нашего клиента , URL адрес API и API Key
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Метод получения через промис данных с записями с Supabase
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

  // Метод получения через промис конкретной записи из Supabase , используется для вытягивания нужного данных записи по
  // Id, чтобы выгрузить данные в компонент
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

  // Метод удаления записи через промис, используется для удаления записей из БД SupaBase
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

  // Метод добавления через промис новых данных в БД Supabase
  async OnInsert(date: string, title: string, text: string, image?: string, author_id? :string) {
    const {data, error} = await this.supabase
      .from('Records')
      .insert([
        {date,title,text,image,author_id}
      ])
  }
  // Метод обновления данных через промис в БД Supabase используется
  async OnUpdate(id:number,date: string, title: string, text: string, image?: string) {
    const {data, error} = await this.supabase
      .from('Records')
      .update([
        {date,title,text,image}
      ])
      .eq('id',id)
  }

}
