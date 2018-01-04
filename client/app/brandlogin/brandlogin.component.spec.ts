import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandloginComponent } from './brandlogin.component';

describe('BrandloginComponent', () => {
  let component: BrandloginComponent;
  let fixture: ComponentFixture<BrandloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
