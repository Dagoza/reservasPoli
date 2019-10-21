import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementsComponent } from './implements.component';

describe('ImplementsComponent', () => {
  let component: ImplementsComponent;
  let fixture: ComponentFixture<ImplementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
