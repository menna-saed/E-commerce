/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlankComComponent } from './blank-com.component';

describe('BlankComComponent', () => {
  let component: BlankComComponent;
  let fixture: ComponentFixture<BlankComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
