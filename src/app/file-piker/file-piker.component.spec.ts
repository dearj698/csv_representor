import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePikerComponent } from './file-piker.component';

describe('FilePikerComponent', () => {
  let component: FilePikerComponent;
  let fixture: ComponentFixture<FilePikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
