import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-current-reservation',
  templateUrl: './current-reservation.component.html',
  styleUrls: ['./current-reservation.component.css']
})
export class CurrentReservationComponent implements OnInit {

  solicitudes: any;

  constructor(private _data: DataService) { }


  ngOnInit() {
    const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`;
    const tomorrow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`;
    console.log(today);
    this._data.pendientesHoy({'fecha_hoy': today, 'fecha_hoy_final': tomorrow}).subscribe(
      (Response: any) => {
        console.log(Response);
        this.solicitudes = Response.reserva;
        console.log(this.solicitudes);
      }, (error: any) => {
        console.log(error);
      }
    );
  }


}
