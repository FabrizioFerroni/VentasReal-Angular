import { Cliente } from 'src/app/models/cliente';
import { ApiBackendService } from './../../services/api-backend.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { DeleteComponent } from '../common/delete/delete.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: any = [];
  columns: Array<string> = ['id', 'nombre', 'acciones']
  readonly width: string = '300';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private apiService: ApiBackendService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.apiService.getCliente().subscribe(
      res => {
        this.clientes = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(
      res => {
        this.getClients();
      }
    )
  }

  openEdit(clt: Cliente): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.width,
      data: clt
    });
    dialogRef.afterClosed().subscribe(
      res => {
        this.getClients();
      }
    )
  }

  Delete(clt: Cliente): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.apiService.deleteCliente(clt.id).subscribe(
            res => {
              if (res.status == 201) {
                this.snackBar.open("Cliente borrado con éxito", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 2000
                })
                this.getClients();
              }
            }
          )
        }
      }
    )
  }

}
