import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IRecords} from "../../models/records";
import {SupabaseService} from "../../services/supabase.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css']
})
export class RecordEditComponent  implements OnInit {
// Компонента редактирования записи

  // лоадер
  loading = true;
  record: IRecords;
  id: number;
  obj: any;
  // Создаем форм гроуп с нашими записями
  FormEditRecord: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    text: new FormControl('',Validators.required),
    date: new FormControl(),
    id: new FormControl(),
    image: new FormControl(),
  });
  date: string;
  // Проверяет будем ли мы зарузжать картинку в нашу запись
  imgDownload = false;
  // Адрес где лежит картинка
  urlImage: string = ''
  sending:boolean
  constructor(private activateRoute: ActivatedRoute, private SupabaseService: SupabaseService, private router: Router){


    this.sending = false
    // id который передается через роутинг
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // запрашиваем нашу запись по id
    this.SupabaseService.getRecordsOnId(this.id)
      .then(data => {
        this.obj = data
        this.record = this.obj[0]
        // Если автор который сейчас залогинен не является автором записи, отправляем его на главную страицу,
        // такой простенький метод защиты
        if(this.record.author_id != localStorage.getItem('user_id'))
          this.router.navigate([''])
        // Заполняем нашу форму данными которые мы получили
        this.FormEditRecord.patchValue({
          text: this.record.text,
          title: this.record.title,
          image: this.record.image,
          date: this.record.date
        })
        this.sending = true
      })
  }

    onSubmit() {
      // используется для защиты отправки нескольких запросов
      this.sending = !this.sending
      // меняем дату на текущую
      this.FormEditRecord.value.date = new Date();
      // заполняем адрес где лежит наша картинка
      if (this.imgDownload) this.FormEditRecord.value.image = this.urlImage;
      this.SupabaseService.OnUpdate(this.id, this.FormEditRecord.value.date,  this.FormEditRecord.value.title, this.FormEditRecord.value.text, this.FormEditRecord.value.image)
        // перекидываем на главную страницу
        .then( data => this.router.navigate(['']))

    }
}
