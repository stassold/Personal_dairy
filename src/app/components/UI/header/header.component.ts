import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthSupabaseService} from "../../../services/auth-supabase.service";
import {interval, Subscription} from "rxjs";
import {HandlerErrService} from "../../../services/handler-err.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// Компонент головы , который отображается на всех страницах
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private AuthSupabaseService: AuthSupabaseService, private router: Router,  private HandlerErrService: HandlerErrService) {
  }

  // Подписчик для работы с сервисом аутенфикации (вход и выход)
  AuthSubcription: Subscription
  // Переменная которая неоюходима для изменения содержимого на странице, смотрит аутенфицирован ли пользователь
  isAuth: boolean = false
  // Подпсичик который следит за аутенфикации , запрашивает каждые 2 секунды
  isAuthSubcription : Subscription

  ngOnInit() {
    // проверяем есль роль аутентификации в локалсторадж , которая  появляется после успешной аутентификации и удаляется при выходе
    if (localStorage.getItem('user_role') === "authenticated")
      this.isAuth = true
    // Проверяет каждые 2 секнудны не поменялся ли наш статус аутентификации
    this.isAuthSubcription = this.AuthSupabaseService.isAuth$.subscribe(() => {
      if (localStorage.getItem('user_role'))
        this.isAuth = true
    })
  }

  // Метод используемый для выхода с аккаунта
  SignOut() {
    if (localStorage.getItem('access_token')) {
      // Для выхода необходимо отправить access_token
      this.AuthSubcription = this.AuthSupabaseService.LogOutAPI(localStorage.getItem('access_token')).subscribe((data) => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_role')
          this.isAuth = false
        },
        (error) => {
        // Если access_token протух выкинет на страницу с ошибкой и так же удалить из localstorage информацию
          this.HandlerErrService.AuthError(error.error.msg)
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_role')
          this.isAuth = false
          this.router.navigate(['/error'])
        })
    }
  }

  // При удаления компонента отписываемся от наших Observable
  ngOnDestroy() {
    if (this.AuthSubcription) this.AuthSubcription.unsubscribe()
    if (this.isAuthSubcription) this.AuthSubcription.unsubscribe()
  }
}
