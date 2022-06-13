import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormCollectionService {

  constructor(
    private httpService:HttpService,
    private router: Router,
    ) { }

  public getAll(): Observable<Form[]>{
    return this.httpService.get(`form`);
  }

  public getById(id: string): Observable<Form>{
    return this.httpService.get(`form/${id}`)
  }

  public getByUsername(username: string): Observable<Form[]>{
    return this.httpService.get(`form/username/${username}`)
  }

  public createForm(form: Form){
    console.log("create front service reached")
    this.httpService.post(`form/createform`, form).subscribe(data => console.log(data))
    this.router.navigate(['dashboard/profile']);
  }
}
