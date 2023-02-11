import { Component } from '@angular/core';
import {HandlerErrService} from "../../../services/handler-err.service";

@Component({
  selector: 'app-handler-error',
  templateUrl: './handler-error.component.html',
  styleUrls: ['./handler-error.component.css']
})
export class HandlerErrorComponent {

 constructor(private HandlerErrService: HandlerErrService) {
 }

 err = this.HandlerErrService.Erorr
}
