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

  AuthSubcription: Subscription;


  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  onSubmit() {
    this.LoginForm.disable();
    this.AuthSubcription = this.AuthSupabaseService.signInAPI(this.LoginForm.value.email, this.LoginForm.value.password).subscribe(
      (data: IAuthData) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_role', data.user.role);
        this.router.navigate([''])
      },
      (error) => {
        this.HandlerErrService.AuthError(error.error.error_description)
        this.router.navigate(['/error'])
      });
  }


  ngOnDestroy() {
    if (this.AuthSubcription) this.AuthSubcription.unsubscribe();
  }

}
