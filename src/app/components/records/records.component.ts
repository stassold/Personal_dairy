import {Component, OnInit} from '@angular/core';
import {IRecords} from 'src/app/models/records';
import {Subscription} from 'rxjs';
import {RecordsService} from 'src/app/services/records.service';
import {SupabaseService} from "../../services/supabase.service";
import {Router} from '@angular/router';
import {AuthSupabaseService} from "../../services/auth-supabase.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  constructor(private RecordsService: RecordsService, private SupabaseService: SupabaseService, private AuthSupabaseService: AuthSupabaseService, private router: Router) {
  }

  isAuth: boolean;
  user: any;
  obj: any;
  author_id: any
  data_supabase = false;
  loading = true;
  records: IRecords[];
  recordsSubcription: Subscription;

  OnAuth() {
    if (localStorage.getItem('user_role') === "authenticated") {
      this.data_supabase = true
      this.author_id = localStorage.getItem('user_id')
      this.isAuth = true
    }
  }



  ngOnInit() {
    this.OnAuth()
    if (!this.data_supabase)
      this.recordsSubcription = this.RecordsService.getRecords().subscribe(
        (data) => {
          this.loading = false;
          this.records = data;
          this.records = this.records.sort((a, b) => a.date < b.date ? 1 : -1);
          this.isAuth = false
        }
      );
    else {
      this.OnGetDataSupabase()
    }
  }

  OnGetDataSupabase() {
    this.SupabaseService.getRecords()
      .then(data => {
        this.obj = data
        this.loading = false;
        this.records = this.obj
        this.records = this.records.sort((a, b) => a.date < b.date ? 1 : -1);
        this.isAuth = true
      })
  }



  OnDelete(id: number) {
    this.loading = true
    this.SupabaseService.OnDelete(id)
      .then(data => {
          this.records = []
          this.OnGetDataSupabase()
        }
      )
  }

  ngOnDestroy() {
    if (this.recordsSubcription) this.recordsSubcription.unsubscribe();
  }
}
