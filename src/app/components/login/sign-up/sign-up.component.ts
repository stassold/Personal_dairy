import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthSupabaseService} from "../../../services/auth-supabase.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private router: Router,private  AuthSupabaseService: AuthSupabaseService){}

  // Копмонента регистрации на Supabase

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });


  onSubmit() {
    this.LoginForm.disable();
    this.AuthSupabaseService.signUp(this.LoginForm.value.email,this.LoginForm.value.password).then( data => this.router.navigate(['/signIn']))
  }
}
