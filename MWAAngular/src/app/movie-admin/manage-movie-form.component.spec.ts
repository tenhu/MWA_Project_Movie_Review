import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMovieFormComponent } from './manage-movie-form.component';

describe('ManageMovieFormComponent', () => {
  let component: ManageMovieFormComponent;
  let fixture: ComponentFixture<ManageMovieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMovieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
