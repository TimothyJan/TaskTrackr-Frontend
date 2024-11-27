import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskModalComponent } from './project-task-modal.component';

describe('ProjectTaskModalComponent', () => {
  let component: ProjectTaskModalComponent;
  let fixture: ComponentFixture<ProjectTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
