import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public onLogoutButtonClick(){
    this.authService.logout();
  }

}
