import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandregisterComponent } from './brandregister.component';

describe('BrandregisterComponent', () => {
  let component: BrandregisterComponent;
  let fixture: ComponentFixture<BrandregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
