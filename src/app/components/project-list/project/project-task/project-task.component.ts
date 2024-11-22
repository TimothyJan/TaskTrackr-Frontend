import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectTaskService } from '../../../../services/project-task.service';
import { ProjectTask } from '../../../../models/project-task.model';

@Component({
  selector: 'app-project-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.css'
})
export class ProjectTaskComponent implements OnInit {
  @Input() projectTaskId: number = 0;
  projectTask: ProjectTask = new ProjectTask(0, 0, "", "", "Not Started", 0);
  editMode: boolean = false;

  // Temporary date strings for input bindings
  startDateString: string = '';
  dueDateString: string = '';

  constructor(private _projectTaskService: ProjectTaskService) {}

  ngOnInit(): void {
    this.getProjectTaskById();
    this.syncDateStrings();
  }

  /** Get ProjectTask by ID */
  getProjectTaskById(): void {
    this.projectTask = this._projectTaskService.getProjectTaskById(this.projectTaskId);
    this.syncDateStrings(); // Sync date strings
  }

  /** Convert Date objects to yyyy-MM-dd strings for binding */
  private syncDateStrings(): void {
    this.startDateString = this.formatDate(this.projectTask.startDate!);
    this.dueDateString = this.formatDate(this.projectTask.dueDate!);
  }

  /** Format a Date object to yyyy-MM-dd */
  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /** Convert yyyy-MM-dd strings back to Date objects */
  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
      const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Use local timezone interpretation
  }

  /** Enter Edit mode for editing projectTask list */
  enterEditMode(): void {
    this.editMode = true;
  }

  /** Update projectTask and leave Edit mode */
  saveChanges(): void {
    // Update the projectTask dates with the converted values
    this.projectTask.startDate = this.parseDate(this.startDateString) || this.projectTask.startDate;
    this.projectTask.dueDate = this.parseDate(this.dueDateString) || this.projectTask.dueDate;
    // Update ProjectTask
    this._projectTaskService.updateProjectTask(this.projectTask);
    this._projectTaskService.notifyProjectTasksChanged();
    this.editMode = false;
  }

  /** Delete ProjectTask */
  deleteProjectTask(): void {
    const confirmDelete = confirm('Are you sure you want to delete this projectTask?');
    if (confirmDelete) {
      this._projectTaskService.deleteProjectTask(this.projectTaskId);
      this._projectTaskService.notifyProjectTasksChanged();
    }
  }
}
