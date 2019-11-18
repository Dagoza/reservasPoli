import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css']
})
export class ScenariosComponent implements OnInit {

  cards = [];

  reserva: any;

  events: CalendarEvent[] = [];
  ok = false;
  selected = 0;
  aux = 0;
  disable = true;

  constructor(public _data: DataService) { }

  ngOnInit() {
    this._data.getScenarios().subscribe(
      (Response: any) => {
        console.log(Response);
        this.cards = Response.escenarios;
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  selection(id) {
    this.events = [];
    this.ok = false;
    this.selected = 0;
    this.aux++;
    this._data.getReserva(id).subscribe(
      (Response: any) => {
        console.log(Response);
        Response.reserva.forEach(element => {
          this.events.push({
            start: new Date(element.fecha_inicial),
            end: new Date(element.fecha_final),
            title: 'Reservado',
            color: element.estado === 'pendiente' ? colors.yellow : colors.red
          });
        });
        this.selected = id;
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  booking(reserva) {
    this.ok = false;
    this.reserva = reserva;
    if (this.selected !== 0 && this.reserva) {
      this.disable = false;
    }
  }

  send() {
    let json = '[';
    this.reserva = JSON.parse(this.reserva);
    console.log(this.reserva);
    this.reserva.forEach(element => {
      json += `{"id_users": "${this._data.idUser}", "id_escenarios": "${this.selected}",
      "fecha_inicial": "${element.start}", "fecha_final": "${element.end}", "estado": "pendiente"},`;
    });
    json = json.slice(0, -1);
    json += ']';
    console.log(json);
    this._data.postReserva(json).subscribe(
      (Response: any) => {
        console.log(Response);
        this.ok = true;
      }, (error: any) => {
        console.log(error);
      }
    );
  }

}
