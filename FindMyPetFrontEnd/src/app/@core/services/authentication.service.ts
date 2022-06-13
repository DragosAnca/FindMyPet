import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../api/http.service';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';

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

  public login(email: string, password:string) {

    return this.httpService.post(`user/login`, {email, password}).subscribe((data) =>{
      if (data == "Username or password incorrect"){
        return;
      }

      this.localStorageService.put('token', data.token);
        this.localStorageService.put(
          'email',
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
    return this.localStorageService.get('email');
  }

  private getUserInfo(data: any): string {
    return data.user.email;
  }

  //TODO Update service

}
