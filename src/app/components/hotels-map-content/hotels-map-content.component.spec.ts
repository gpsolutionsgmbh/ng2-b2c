/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HotelsMapContentComponent} from './hotels-map-content.component';
import {GoogleMapsAPIWrapper, AgmCoreModule} from "angular2-google-maps/core";
import {environment} from "../../../environments/environment";

describe('HotelsMapContentComponent', () => {
  let component: HotelsMapContentComponent;
  let fixture: ComponentFixture<HotelsMapContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsMapContentComponent],
      providers: [
        GoogleMapsAPIWrapper
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsMapContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
