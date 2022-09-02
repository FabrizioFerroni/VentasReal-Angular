import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
 url!: string;

  constructor(
    private http:HttpClient
  ) {
    this.url = environment.url;
  }

  getCliente(): Observable<Response>{
    return this.http.get<Response>(this.url + 'cliente');
  }
}
