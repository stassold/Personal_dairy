import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRecords } from 'src/app/models/records';
import { Router } from '@angular/router';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-record-add',
  templateUrl: './record-add.component.html',
  styleUrls: ['./record-add.component.css'],
})
export class RecordAddComponent {
  // компонента добавления записи
  constructor(private router: Router,private SupabaseService: SupabaseService){}
  urlImage: string = ''
  records: IRecords[] = [];
  date = new Date();
  imgDownload = false;
  // Создаем форм гроуп для отправки ее на бэкэнд
  FormAddRecord: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    text: new FormControl('',Validators.required),
    date: new FormControl(),
    id: new FormControl(),
    image: new FormControl(),
    author_id : new FormControl()
  });
  sending = this.FormAddRecord.invalid
  onSubmit() {
    // защита от нескольких отправок пользователем
    this.sending = !this.sending
    this.FormAddRecord.disable();
    this.FormAddRecord.value.date = new Date();
    if (this.imgDownload) this.FormAddRecord.value.image = this.urlImage;
    // Автора текста берем из localstorage
    this.FormAddRecord.value.author_id = localStorage.getItem('user_id')
    this.SupabaseService.OnInsert( this.FormAddRecord.value.date,  this.FormAddRecord.value.title, this.FormAddRecord.value.text, this.FormAddRecord.value.image,  this.FormAddRecord.value.author_id)
      .then( data => this.router.navigate(['']))

  }
}
