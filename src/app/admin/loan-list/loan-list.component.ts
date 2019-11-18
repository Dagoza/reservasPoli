import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  solicitudes: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.getPrestamos().subscribe(
      (Response: any) => {
        console.log(Response);
        this.solicitudes = Response.implementos;
        console.log(this.solicitudes);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  estadoSolicitud(id, estado) {
    this._data.updateEstadoPrestamo({id: id + '', estado : estado}).subscribe(
      (Response: any) => {
        this._data.sendMailPrestamo({id: id + '', estado : estado}).subscribe(
          (response: any) => {
            console.log(response);
            this.ngOnInit();
          }, (error: any) => {
            console.log(error);
          }
        );
      }, (error: any) => {
        console.log(error);
      }
    );

  }
}
