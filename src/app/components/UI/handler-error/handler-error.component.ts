import { Component } from '@angular/core';
import {HandlerErrService} from "../../../services/handler-err.service";

@Component({
  selector: 'app-handler-error',
  templateUrl: './handler-error.component.html',
  styleUrls: ['./handler-error.component.css']
})
export class HandlerErrorComponent {

  // Компонент с выводом наших ошибок
 constructor(private HandlerErrService: HandlerErrService) {
 }

 // Информация об ошибке из сервиса
 err = this.HandlerErrService.Erorr
}
