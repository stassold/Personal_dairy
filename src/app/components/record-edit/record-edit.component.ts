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

  loading = true;
  record: IRecords;
  id: number;
  obj: any;
  FormEditRecord: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    text: new FormControl('',Validators.required),
    date: new FormControl(),
    id: new FormControl(),
    image: new FormControl(),
  });
  date: string;
  imgDownload = false;
  urlImage: string = ''
  sending:boolean
  constructor(private activateRoute: ActivatedRoute, private SupabaseService: SupabaseService, private router: Router){


    this.sending = false
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.SupabaseService.getRecordsOnId(this.id)
      .then(data => {
        this.obj = data
        this.record = this.obj[0]
        if(this.record.author_id != localStorage.getItem('user_id'))
          this.router.navigate([''])
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
      console.log(this.FormEditRecord.value);
      this.sending = !this.sending
      this.FormEditRecord.value.date = new Date();
      if (this.imgDownload) this.FormEditRecord.value.image = this.urlImage;
      this.SupabaseService.OnUpdate(this.id, this.FormEditRecord.value.date,  this.FormEditRecord.value.title, this.FormEditRecord.value.text, this.FormEditRecord.value.image)
        .then( data => this.router.navigate(['']))

    }
}
