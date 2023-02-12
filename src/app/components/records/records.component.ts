import {Component, OnInit} from '@angular/core';
import {IRecords} from 'src/app/models/records';
import {Subscription} from 'rxjs';
import {RecordsService} from 'src/app/services/records.service';
import {SupabaseService} from "../../services/supabase.service";


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
// Компонент главной страницы, здесь отображается наши записи дневника
export class RecordsComponent implements OnInit {
  constructor(private RecordsService: RecordsService, private SupabaseService: SupabaseService) {
  }
  // Проверка аутентификации
  isAuth: boolean;
  // Внутренний объект в который мы записываем , что получаем с backend
  obj: any;
  // id автора записи, используется в верстке, чтобы добавлять методы удаления и редактирования только записям автора
  author_id: string | null
  // Переменная которая проверяет доступен ли сервис supabase и аутефицирован ли пользователь, чтобы смотреть все записи ,
  // в ином случаем загрузка идет с дрого backend
  data_supabase = false;
  // Переменная которая вызывает или прерывает в зависимости состояния наш лоадер
  loading = true;
  // Записи дневника
  records: IRecords[];
  // Подписчик для получения записей с backend по умолчанию ( без авторизации)
  recordsSubcription: Subscription;

  // Метод проверки аутефикации
  OnAuth() {
    if (localStorage.getItem('user_role') === "authenticated") {
      this.data_supabase = true
      this.author_id = localStorage.getItem('user_id')
      this.isAuth = true
    }
  }

  ngOnInit() {
    this.OnAuth()
    // Если Supabase не доступна или пользователь не аутентификацирован
    if (!this.data_supabase)
      this.recordsSubcription = this.RecordsService.getRecords().subscribe(
        (data) => {
          this.loading = false;
          this.records = data;
          // Сортировка записей
          this.records = this.records.sort((a, b) => a.date < b.date ? 1 : -1);
          this.isAuth = false
        }
      );
    else {
      this.OnGetDataSupabase()
    }
  }

  // Метод получения записей с Supabase
  OnGetDataSupabase() {
    this.SupabaseService.getRecords()
      .then(data => {
        this.obj = data
        this.loading = false;
        this.records = this.obj
        this.records = this.records.sort((a, b) => a.date < b.date ? 1 : -1);
        this.isAuth = true
      })
  }


  // Метод удаления записи
  OnDelete(id: number) {
    this.loading = true
    this.SupabaseService.OnDelete(id)
      .then(data => {
          this.records = []
          this.OnGetDataSupabase()
        }
      )
  }

  // При удаленения компонента не забываем отписываться
  ngOnDestroy() {
    if (this.recordsSubcription) this.recordsSubcription.unsubscribe();
  }
}
