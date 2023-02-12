import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthSupabaseService} from "../../../services/auth-supabase.service";
import {HandlerErrService} from "../../../services/handler-err.service";
import {Subscription} from 'rxjs';
import {IAuthData} from "../../../models/auth-data";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {
  constructor(private router: Router, private AuthSupabaseService: AuthSupabaseService, private HandlerErrService: HandlerErrService) {
  }

  // Компонента входа на Supabase

  // Подписчик аутентификации
  AuthSubcription: Subscription;


  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  onSubmit() {
    this.LoginForm.disable();
    // Отправялем наш запрос откуда в случае успеха получаем объект с аутентификационными данными
    this.AuthSubcription = this.AuthSupabaseService.signInAPI(this.LoginForm.value.email, this.LoginForm.value.password).subscribe(
      (data: IAuthData) => {
        // Записываем наши данные в локалсторэдж и отправляемя на главную страницу
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_role', data.user.role);
        this.router.navigate([''])
      },
      (error) => {
        // В случае ошибки кидаем ее в сервис и отправляем на компоненту с выводом ошибок
        this.HandlerErrService.AuthError(error.error.error_description)
        this.router.navigate(['/error'])
      });
  }


  ngOnDestroy() {
    if (this.AuthSubcription) this.AuthSubcription.unsubscribe();
  }

}
