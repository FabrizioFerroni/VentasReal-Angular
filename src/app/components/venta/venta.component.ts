import { ApiBackendService } from './../../services/api-backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { VentaDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  readonly width: string = '600';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private apiService: ApiBackendService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  openAdd(): void{
    const dialogRef = this.dialog.open(VentaDialogComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
