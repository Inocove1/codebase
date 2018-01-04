import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmessagesComponent } from './brandmessages.component';

describe('BrandmessagesComponent', () => {
  let component: BrandmessagesComponent;
  let fixture: ComponentFixture<BrandmessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandmessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
