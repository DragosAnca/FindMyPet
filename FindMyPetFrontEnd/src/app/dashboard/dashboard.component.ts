import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../@core/services/local-storage-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

  }

}
