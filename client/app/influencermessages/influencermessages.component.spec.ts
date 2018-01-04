import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencermessagesComponent } from './influencermessages.component';

describe('InfluencermessagesComponent', () => {
  let component: InfluencermessagesComponent;
  let fixture: ComponentFixture<InfluencermessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencermessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencermessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
