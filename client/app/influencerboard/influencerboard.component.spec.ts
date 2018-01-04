import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerboardComponent } from './influencerboard.component';

describe('InfluencerboardComponent', () => {
  let component: InfluencerboardComponent;
  let fixture: ComponentFixture<InfluencerboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
