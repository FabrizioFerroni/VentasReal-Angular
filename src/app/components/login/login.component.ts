import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiAuthService } from './../../services/api-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private authServ: ApiAuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {
    if (authServ.usuarioData) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {


  }

  login(): void {
    console.log(this.loginForm.value);
    this.authServ.login(this.loginForm.value).subscribe(
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
