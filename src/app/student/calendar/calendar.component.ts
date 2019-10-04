import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
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

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() events: CalendarEvent[];

  @Output() bookingChange = new EventEmitter();

  activeDayIsOpen: boolean;
  selectedDayViewDate: Date;
  actionDelete = [
    {
      label: '<span style="font-size:20px"><b>&times; </b></span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.cont = 0;
      }
    }
  ];
  cont = 0;

  // Calendario
  viewDate: Date = new Date();
  view = 'month';
  refresh: Subject<any> = new Subject();

  constructor() {

  }

  ngOnInit() {
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    const startDate = date;
    const endDate = date;
    if (this.cont === 0) {
      this.events.push({
        start: startDate,
        end: startDate,
        title: 'Reserva desde: \n' + startDate.toLocaleDateString('es', options),
        color: colors.blue,
        actions: this.actionDelete
      });
      this.cont++;
    } else if (this.cont === 1) {
      endDate.setMinutes(date.getMinutes() + 30);
      this.events[this.events.length - 1].title += ' hasta ' + endDate.toLocaleDateString('es', options);
      this.events[this.events.length - 1].end = endDate;
      this.cont++;
      // tslint:disable-next-line:max-line-length
      this.bookingChange.emit(JSON.stringify({ start: this.events[this.events.length - 1].start, end: this.events[this.events.length - 1].end }));
    } else {
      this.bookingChange.emit();
      this.events.pop();
      this.cont = 0;
    }
    this.refresh.next();
  }


}
