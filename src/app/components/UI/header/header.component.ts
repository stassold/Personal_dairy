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
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private AuthSupabaseService: AuthSupabaseService, private router: Router,  private HandlerErrService: HandlerErrService) {
  }

  AuthSubcription: Subscription
  isAuth: boolean = false
  isAuthSubcription : Subscription

  ngOnInit() {
    if (localStorage.getItem('user_role') === "authenticated")
      this.isAuth = true
    this.isAuthSubcription = this.AuthSupabaseService.isAuth$.subscribe(() => {
      if (localStorage.getItem('user_role'))
        this.isAuth = true
    })
  }

  SignOut() {
    if (localStorage.getItem('access_token')) {
      this.AuthSubcription = this.AuthSupabaseService.LogOutAPI(localStorage.getItem('access_token')).subscribe((data) => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_role')
          this.isAuth = false
        },
        (error) => {
          this.HandlerErrService.AuthError(error.error.msg)
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_role')
          this.isAuth = false
          this.router.navigate(['/error'])
        })
    }
  }

  ngOnDestroy() {
    if (this.AuthSubcription) this.AuthSubcription.unsubscribe()
    if (this.isAuthSubcription) this.AuthSubcription.unsubscribe()
  }
}
