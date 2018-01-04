import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsearchinfuComponent } from './brandsearchinfu.component';

describe('BrandsearchinfuComponent', () => {
  let component: BrandsearchinfuComponent;
  let fixture: ComponentFixture<BrandsearchinfuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsearchinfuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsearchinfuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
