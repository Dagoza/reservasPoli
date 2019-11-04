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
  // [{
  //   id: 1,
  //   img: 'https://www.las2orillas.co/wp-content/uploads/2019/06/cancha.png',
  //   title: 'Cancha de noche',
  //   location: 'P40',
  //   description: 'Cancha de futbol con buena iluminación',
  //   medidas: ''
  // },
  // {
  //   id: 2,
  //   img: 'https://proyectostipo.dnp.gov.co/media/k2/items/cache/5fa21cd9e0d2531a2f1dfdffbab46f70_XL.jpg',
  //   title: 'Cancha pequeña',
  //   location: 'Piscina',
  //   description: 'Cancha de futbol en mallas'
  // },
  // {
  //   id: 3,
  //   img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbii_5oeX9bFE26ZkmDg1Au9isqbEl_tClft-KXZL7sMX8KidG7A',
  //   title: 'Cancha de Tennis',
  //   location: 'Coliseo',
  //   description: 'Cancha de Tennis '
  // },
  // {
  //   id: 4,
  //   img: 'https://primertiempo.co/wp-content/uploads/2019/04/Coliseo-Bernardo-Caraballo.jpg',
  //   title: 'Cancha de Bascket',
  //   location: 'Coliseo',
  //   description: 'Cancha de bascketball dentro de coliseo cubierto'
  // },
  // {
  //   id: 5,
  //   img: 'https://versacourtinternational.com.mx/cmss_files/photogallery/structure/image39007.jpg',
  //   title: 'Cancha de Voleiball',
  //   location: 'P36',
  //   description: 'Cancha de voleibol en cemento con malla'
  // }
  // ];

  reserva: any;

  events: CalendarEvent[] = [];

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
    this.selected = id;
    this.aux++;
    this._data.getReserva(id).subscribe(
      (Response: any) => {
        console.log(Response);
        Response.reserva.forEach(element => {
          this.events.push({
            start: new Date(element.fecha_inicial),
            end: new Date(element.fecha_final),
            title: 'Reservado',
            color: colors.red
          });
        });
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  booking(reserva) {
    this.reserva = reserva;
    if (this.selected !== 0 && this.reserva) {
      this.disable = false;
    }
  }

  send() {
    let json = '[';
    this.reserva = JSON.parse(this.reserva);
    this.reserva.forEach(element => {
      json += `{"id_users": "${this._data.idUser}", "id_escenarios": "${this.selected}",
      "fecha_inicial": "${element.start}", "fecha_final": "${element.end}", "estado": "pendiente"},`;
    });
    json = json.slice(0, -1);
    json = json.replace(/T/g, ' ');
    json = json.replace(/.000Z/g, '');
    json += ']';
    console.log(json);
    this._data.postReserva(json).subscribe(
      (Response: any) => {
        console.log(Response);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

}
