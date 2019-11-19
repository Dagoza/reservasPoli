import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DayViewHour } from 'calendar-utils';
import { addDays, addHours, startOfDay } from 'date-fns';
import { DataService } from 'src/app/service/data.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-implements',
  templateUrl: './implements.component.html',
  styleUrls: ['./implements.component.css']
})
export class ImplementsComponent implements OnInit {

  implementos = [];
  valor = 0;
  cantidadTotal = 0;
  cantidad = 0;
  prestamo: any;
  selected = 0;
  validacion = false;
  ok = false;
  okay = false;
  aux = 0;
  disable = true;
  loading = false;
  events: CalendarEvent[] = [];

  constructor(public _data: DataService) { }

  ngOnInit() {
    this.loading = true;
    this._data.getImplements().subscribe(
      (Response: any) => {
        console.log(Response);
        this.implementos = Response.implementos;
        this.loading = false;
      }, (error: any) => {
        console.log(error);
      }
    );
  }


  selection(id, descripcion, cantidad, valor) {
    this.loading = true;
    this.cantidadTotal = cantidad;
    this.valor = valor;
    this.selected = 0;
    this.events = [];
    this._data.getBookingImplements(descripcion).subscribe(
      (Response: any) => {
        console.log(Response);
        Response.implementos.forEach(element => {
          this.events.push({
            id: element.id,
            start: new Date(element.fecha_inicial),
            end: new Date(element.fecha_final),
            title: 'Prestado',
            color: element.estado === 'pendiente' ? colors.yellow : colors.red
          });
          this.loading = false;
        });
        this.selected = id;
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  booking(reserva) {
    this.prestamo = reserva;
    if (this.selected !== 0 && this.prestamo) {
      this.disable = false;
    }
  }

  validacionCantidad() {
    if (this.cantidad > this.cantidadTotal) {
      this.validacion = true;
      this.ok = false;
    } else {
      this.ok = true;
      this.validacion = false;
    }
  }

  send() {
    this.loading = true;
    let json = '[';
    this.prestamo = JSON.parse(this.prestamo);
    this.prestamo.forEach(element => {
      for(let i = 0; i < this.cantidad; i++) {
        json += `{"id_user": "${this._data.idUser}", "id_implementos": "${this.selected}",
        "fecha_inicial": "${element.start}", "fecha_final": "${element.end}", "estado": "pendiente"},`;
      }
    });
    json = json.slice(0, -1);
    json += ']';
    console.log(json);
    this._data.postPrestamo(json).subscribe(
      (Response: any) => {
        console.log(Response);
        this.okay = true;
        this.loading = false;
      }, (error: any) => {
        console.log(error);
      }
    );
  }
}
