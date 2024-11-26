import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectTask } from '../../../../models/project-task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectTaskService } from '../../../../services/project-task.service';

@Component({
  selector: 'app-project-task-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './project-task-modal.component.html',
  styleUrl: './project-task-modal.component.css'
})
export class ProjectTaskModalComponent implements OnInit {
  @Input() projectId: number | undefined;
  projectTask: ProjectTask = new ProjectTask(0, 0, "", "", "Not Started", 0);
  startDateString: string = '';
  dueDateString: string = '';

  @Output() taskCreated = new EventEmitter<ProjectTask>();

  constructor(
    public activeModal: NgbActiveModal,
    private _projectTaskService: ProjectTaskService
  ) {}

  ngOnInit(): void {
    this.projectTask.projectId = this.projectId!;
  }

  /** Convert yyyy-MM-dd strings back to Date objects */
  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
      const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Use local timezone interpretation
  }

  addProjectTask(): void {
    console.log()
    // Update the projectTask dates with the converted values
    this.projectTask.startDate = this.parseDate(this.startDateString) || this.projectTask.startDate;
    this.projectTask.dueDate = this.parseDate(this.dueDateString) || this.projectTask.dueDate;
    // Update ProjectTask
    this._projectTaskService.addProjectTask(this.projectTask);

    // Clear the form
    this.projectTask = new ProjectTask(0, 0, "", "", "Not Started", 0);
    this.startDateString = '';
    this.dueDateString = '';
    this.closeModal();
  }

  closeModal(): void {
    this.activeModal.close(); // Pass result back to parent
  }
}
