import { ApiBackendService } from './../../services/api-backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private apiService: ApiBackendService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients():void{
    this.apiService.getCliente().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

}
