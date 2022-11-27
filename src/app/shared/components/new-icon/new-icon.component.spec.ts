/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewIconComponent } from './new-icon.component';

describe('NewIconComponent', () => {
  let component: NewIconComponent;
  let fixture: ComponentFixture<NewIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
