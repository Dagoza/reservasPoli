import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  solicitudes: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.getBooking('pendiente').subscribe(
      (Response: any) => {
        console.log(Response);
        this.solicitudes = Response.reserva;
        console.log(this.solicitudes);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  estadoSolicitud(id, estado) {
    this._data.updateEstadoReserva({id: id + '', estado : estado}).subscribe(
      (Response: any) => {
        this._data.sendMail({id: id + '', estado : estado}).subscribe(
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
