import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input('cards') cards: any;

  @Output() selectionChange = new EventEmitter();

  @ViewChild('carousel')
  private Carousel: NgbCarousel;

  carouselSections = [];

  selection: number;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    console.log(this.cards);
    const aux = { cont: 0, section: [] };
    this.cards.forEach((element) => {
      aux.section.push(element);
      if (aux.cont < 2) {
        aux.cont++;
      } else {
        this.carouselSections.push({
          pos: this.carouselSections.length,
          slide: aux.section,
          active: this.carouselSections.length === 0 ? true : false
        });
        aux.cont = 0;
        aux.section = [];
      }
    });
    if (aux.cont !== 0) {
      this.carouselSections.push({
        pos: this.carouselSections.length,
        slide: aux.section,
        active: this.carouselSections.length === 0 ? true : false
      });
    }
  }

  arrows(i) {
    i === 0 ? this.Carousel.prev() : this.Carousel.next();
  }

  photoURL(imagen) {
    return this.sanitizer.bypassSecurityTrustUrl(imagen);
  }

  selecter(id) {
    this.selection = 0;
    this.selection = id;
    this.selectionChange.emit(this.selection);
  }
}
