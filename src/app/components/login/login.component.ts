import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiAuthService } from './../../services/api-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  data = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private authServ: ApiAuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    if (authServ.usuarioData) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }


  login(): void {
    this.data = {
      email: this.email,
      password: this.password
    };

    this.authServ.login(this.data).subscribe(
      res => {
        if (res.status === 200) {
          this.router.navigate(['/'])
          this.snackBar.open("Te has logueado con éxito", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 2000
          })
        }
      },
      err => {
        console.log(err);
        this.snackBar.open(err.error.mensaje, "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'mat-warn'],
          duration: 2000
        })
      }
    )
  }

}
