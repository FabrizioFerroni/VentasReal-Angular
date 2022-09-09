import { Cliente } from './../models/cliente';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

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

  // MODULE CLIENTES
  getCliente(): Observable<Response> {
    return this.http.get<Response>(this.url + 'cliente');
  }

  getClientebyId(id: number): Observable<Response> {
    return this.http.get<Response>(this.url + 'cliente/' + id);
  }

  addCliente(clt: Cliente): Observable<Response> {
    return this.http.post<Response>(this.url + 'cliente/nuevo', clt);
  }

  editCliente(id: any, clt: Cliente): Observable<Response> {
    return this.http.put<Response>(this.url + 'cliente/' + id + '/editar', clt);
  }

  deleteCliente(id: number): Observable<Response> {
    return this.http.delete<Response>(this.url + 'cliente/' + id + '/borrar');
  }

  // MODULE VENTAS
  addVentas(ven: Venta): Observable<Response> {
    console.log(ven);

    return this.http.post<Response>(this.url + 'venta/nuevo', ven);
  }

}
