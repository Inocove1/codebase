import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflusearchbrandComponent } from './influsearchbrand.component';

describe('InflusearchbrandComponent', () => {
  let component: InflusearchbrandComponent;
  let fixture: ComponentFixture<InflusearchbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflusearchbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflusearchbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
