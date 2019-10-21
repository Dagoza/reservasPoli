import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DayViewHour } from 'calendar-utils';
import { addDays, addHours, startOfDay } from 'date-fns';

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

  cards = [{
    id: 1,
    img: 'https://www.las2orillas.co/wp-content/uploads/2019/06/cancha.png',
    title: 'Balon basquet',
    location: 'Disponible: 10',
    description: 'Cancha de futbol con buena iluminación'
  },
  {
    id: 2,
    img: 'https://proyectostipo.dnp.gov.co/media/k2/items/cache/5fa21cd9e0d2531a2f1dfdffbab46f70_XL.jpg',
    title: 'Cancha pequeña',
    location: 'Disponible: 5',
    description: 'Cancha de futbol en mallas'
  },
  {
    id: 3,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbii_5oeX9bFE26ZkmDg1Au9isqbEl_tClft-KXZL7sMX8KidG7A',
    title: 'Cancha de Tennis',
    location: 'Disponible: 4',
    description: 'Cancha de Tennis '
  },
  {
    id: 4,
    img: 'https://primertiempo.co/wp-content/uploads/2019/04/Coliseo-Bernardo-Caraballo.jpg',
    title: 'Cancha de Bascket',
    location: 'Coliseo',
    description: 'Cancha de bascketball dentro de coliseo cubierto'
  },
  {
    id: 5,
    img: 'https://versacourtinternational.com.mx/cmss_files/photogallery/structure/image39007.jpg',
    title: 'Cancha de Voleiball',
    location: 'P36',
    description: 'Cancha de voleibol en cemento con malla'
  }
  ];

  reserva = {};

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 8),
      end: addHours(startOfDay(new Date()), 10),
      title: 'Reservado',
      color: colors.red
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 1)), 12),
      end: addHours(startOfDay(addDays(new Date(), 1)), 14),
      title: 'Reservado',
      color: colors.red
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 2)), 2),
      end: addHours(startOfDay(addDays(new Date(), 2)), 5),
      title: 'Reservado',
      color: colors.red
    }
  ];

  events2: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 8),
      end: addHours(startOfDay(new Date()), 10),
      title: 'Reservado',
      color: colors.red
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 3)), 12),
      end: addHours(startOfDay(addDays(new Date(), 3)), 14),
      title: 'Reservado',
      color: colors.red
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 4)), 2),
      end: addHours(startOfDay(addDays(new Date(), 4)), 5),
      title: 'Reservado',
      color: colors.red
    }
  ];

  selected = 0;
  aux = 0;
  disable = true;

  constructor() { }

  ngOnInit() {
    // get cartas
  }


  selection(id) {
    if (this.aux === 1) {
      this.events = this.events2;
    }
    this.selected = id;
    this.aux++;
     // get cantidad disponible
    // get eventos para el calendario
  }

  booking(reserva) {
    console.log(reserva);
    this.reserva = reserva;
    if (this.selected !== 0 && this.reserva) {
      this.disable = false;
    }
  }
}
