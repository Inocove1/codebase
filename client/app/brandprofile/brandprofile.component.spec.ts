import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandprofileComponent } from './brandprofile.component';

describe('BrandprofileComponent', () => {
  let component: BrandprofileComponent;
  let fixture: ComponentFixture<BrandprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
