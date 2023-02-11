import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordAddComponent } from './components/record-add/record-add.component';
import { RecordEditComponent } from './components/record-edit/record-edit.component';
import { RecordsComponent } from './components/records/records.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import {HandlerErrorComponent} from "./components/UI/handler-error/handler-error.component";

const routes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'edit/:id', component: RecordEditComponent },
  { path: 'add', component: RecordAddComponent },
  { path: 'signIn', component:  SignInComponent},
  { path: 'signUp', component:  SignUpComponent},
  { path: 'error', component:  HandlerErrorComponent},
  { path: "**", redirectTo: "", component: RecordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
