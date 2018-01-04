import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandboardComponent } from './brandboard.component';

describe('BrandboardComponent', () => {
  let component: BrandboardComponent;
  let fixture: ComponentFixture<BrandboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
