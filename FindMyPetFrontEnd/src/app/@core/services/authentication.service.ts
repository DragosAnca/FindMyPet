import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../api/http.service';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    private readonly httpService: HttpService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
    ) { }

  public login(email: string, password:string) {

    return this.httpService.post(`user/login`, {email, password}).subscribe((data) =>{
      if (data == "Username or password incorrect"){
        return;
      }

      this.localStorageService.put('token', data.accessToken);
        this.localStorageService.put(
          'info',
          JSON.stringify(this.getUserInfo(data))
        );
        this.router.navigate(['']);
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

    if(token){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    return false;

  }

  public logout(): void {
    const token = this.localStorageService.get('token');
    if (token === null) return;
   this.localStorageService.put('token', '');
  }

  public getInfo(): User {
    return JSON.parse(this.localStorageService.get('info')!);
  }

  private getUserInfo(data: any): User {
    const userInfo: User = {
      email: data.email,
    };

    return userInfo;
  }

  //TODO Update service

}