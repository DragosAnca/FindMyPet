import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormCollectionService {

  constructor(private httpService:HttpService ) { }

  public getAll(): Observable<Form[]>{
    return this.httpService.get(`form`);
  }

  public getById(id: string): Observable<Form>{
    return this.httpService.get(`form/${id}`)
  }
}
