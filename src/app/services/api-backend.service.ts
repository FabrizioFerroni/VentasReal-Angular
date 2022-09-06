import { Cliente } from './../models/cliente';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  url!: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.url;
  }

  getCliente(): Observable<Response> {
    return this.http.get<Response>(this.url + 'cliente');
  }

  getClientebyId(id: number): Observable<Response> {
    return this.http.get<Response>(this.url + 'cliente/' + id);
  }

  addCliente(clt: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + 'cliente/nuevo', clt);
  }

  editCliente(id: any, clt: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + 'cliente/' + id + '/editar', clt);
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url + 'cliente/' + id + '/borrar');
  }

}
