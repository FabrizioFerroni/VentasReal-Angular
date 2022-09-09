import { Router } from '@angular/router';
import { ApiAuthService } from './services/api-auth.service';
import { Usuario } from './models/usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ventas Real';
  user!: Usuario;

  constructor(
    public authServ: ApiAuthService,
    private router: Router,
  ){
    authServ.usuario.subscribe(
      res => {
        this.user = res;
        console.log("Cambio el objeto: " + res)
      }
    )
  }


  logout():void {
    this.authServ.logout();
    this.router.navigate(['/iniciarsesion']);
  }
}
