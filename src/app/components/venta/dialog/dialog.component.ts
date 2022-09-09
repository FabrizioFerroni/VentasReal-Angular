import { Concepto } from './../../../models/concepto';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiBackendService } from './../../../services/api-backend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class VentaDialogComponent implements OnInit {

  title: string = 'Nueva venta';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  btn: string = 'Agregar';
  icon: string = '<i class="fa fa-plus" aria-hidden="true"></i>';
  venta!: Venta;
  concepto!: Concepto[];

  conceptoForm = this.formBUilder.group({
    cantidad: [0, Validators.required],
    importe: [0, Validators.required],
    idProducto: [1, Validators.required],
  })
  constructor(
    public dialogRef: MatDialogRef<VentaDialogComponent>,
    private apiService: ApiBackendService,
    public snackBar: MatSnackBar,
    private formBUilder: FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public venta: Venta,
  ) {
    // if (this.venta !== null) {
    //   // this.icon = '<i class="fa fa-pencil" aria-hidden="true"></i>'
    //   // this.btn = 'Editar'
    //   // this.nombre = venta.nombre;
    //   // this.id = venta.id
    //   // this.title = 'Editar venta'

    // }
    this.concepto = [];
    this.venta = {
      idCliente: 15,
      conceptos: []
    }
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  addConcepto(): void {
    this.concepto.push(this.conceptoForm.value);
  }

  addVenta(): void {
    this.venta.conceptos = this.concepto;
    this.apiService.addVentas(this.venta).subscribe(
      res => {
        // if (res.status == 201) {
          this.dialogRef.close();
          this.snackBar.open("Cliente insertado con éxito", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
          })
        // }
      }
    )
  }

}
