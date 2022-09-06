import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiBackendService } from './../../../services/api-backend.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  nombre!: string;
  id!: any;
  title: string = 'Nuevo cliente';
  btn: string = 'Agregar';
  icon: string = '<i class="fa fa-plus" aria-hidden="true"></i>';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private apiService: ApiBackendService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
  ) {
    if(this.cliente !== null){
      this.icon = '<i class="fa fa-pencil" aria-hidden="true"></i>'
      this.btn = 'Editar'
      this.nombre = cliente.nombre;
      this.id = cliente.id
      this.title = 'Editar cliente'
      console.log(this.id);

    }
   }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  addCliente(): void {
    const clt: Cliente = {
      id: 0,
      nombre: this.nombre
    };

    this.apiService.addCliente(clt).subscribe(
      res => {
        if (res.status === 201) {
          this.dialogRef.close();
          this.snackBar.open("Cliente insertado con éxito", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
          })
        }
      }
    )
  }

  editCliente(): void{
    const clt_edit: Cliente = {
      id: this.cliente.id,
      nombre: this.nombre
    };

    this.apiService.editCliente(this.id, clt_edit).subscribe(
      res => {
        if(res.status == 201){
          this.dialogRef.close();
          this.snackBar.open("Cliente editado con éxito", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
          })
        }
      }
    )
  }
}
