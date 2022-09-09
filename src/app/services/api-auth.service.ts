import { Login } from './../models/login';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
// import { map } from 'rxjs-compat/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url!: string;

  private usuarioSubject: BehaviorSubject<Usuario>;
  usuario: Observable<Usuario>;
  public get usuarioData(): Usuario {
    return this.usuarioSubject.value;
  }

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.url;

    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
    this.usuario = this.usuarioSubject.asObservable();
  }


  login(login: Login): Observable<Response> {
    return this.http.post<Response>(this.url + 'usuario/login', login).pipe(
      map(res => {
        if(res.status === 200){
          const user: Usuario = res.data;
          localStorage.setItem('usuario', JSON.stringify(user));
          this.usuarioSubject.next(user);
        }
        return res;
      })
    );
  }

  logout(): void{
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
  }
}
