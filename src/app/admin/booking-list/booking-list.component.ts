import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  solicitudes: any;
  loading = false;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.loading = true;
    this._data.getBooking('pendiente').subscribe(
      (Response: any) => {
        console.log(Response);
        this.solicitudes = Response.reserva;
        this.loading = false;
        console.log(this.solicitudes);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  estadoSolicitud(id, estado) {
    this.loading = true;
    this._data.updateEstadoReserva({id: id + '', estado : estado}).subscribe(
      (Response: any) => {
        this._data.sendMail({id: id + '', estado : estado}).subscribe(
          (response: any) => {
            console.log(response);
            this.loading = false;
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
