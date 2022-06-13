import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../api/http.service';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelper = new JwtHelperService();
  constructor(
    private  httpService: HttpService,
    private  localStorageService: LocalStorageService,
    private  router: Router,
    ) { }

  public login(username: string, password:string) {

    return this.httpService.post(`user/login`, {username, password}).subscribe((data) =>{
      if (data == "Username or password incorrect"){
        return;
      }

      this.localStorageService.put('token', data.token);
        this.localStorageService.put(
          'username',
          this.getUserInfo(data),
        );
        this.router.navigate(['dashboard']);
    });

  }

  public register(user: User){
    this.httpService.post(`user/register`, user).subscribe((data) =>{
      if (data == "Email already registered"){
        return;
      }
    })

  }

  public isAuthenticated(): boolean{
    const token = this.localStorageService.get('token');
    console.warn(token)

    return !this.jwtHelper.isTokenExpired(token);

  }

  public logout(): void {
    const token = this.localStorageService.get('token');
    if (token === null) return;
   this.localStorageService.put('token', '');
  }

  public getInfo(): string {
    return this.localStorageService.get('username');
  }

  private getUserInfo(data: any): string {
    return data.user.username;
  }

  public sendPasswordByEmail(email: string) {
    this.httpService.get(`user/forgot/${email}`).subscribe((data) => {
      console.warn(data)
    });
    this.router.navigate(['auth/login'])
  }

  //TODO Update service

}
