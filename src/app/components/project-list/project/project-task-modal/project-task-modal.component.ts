import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectTask } from '../../../../models/project-task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectTaskService } from '../../../../services/project-task.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-project-task-modal',
  standalone: true,
  imports: [
    CommonModule,
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
  users: User[] = [];

  titleInvalid: boolean = false;
  descriptionInvalid: boolean = false;

  @Output() taskCreated = new EventEmitter<ProjectTask>();

  constructor(
    public activeModal: NgbActiveModal,
    private _projectTaskService: ProjectTaskService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.projectTask.projectId = this.projectId!;
    this.getUsers();
  }

  /** Convert yyyy-MM-dd strings back to Date objects */
  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
      const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Use local timezone interpretation
  }

  /** Gets all users */
  getUsers(): void {
    this.users = this._userService.getUsers();
  }

  /** Validation for title and description */
  validateFields(): void {
    this.titleInvalid = !this.projectTask.title.trim();
    this.descriptionInvalid = !this.projectTask.description.trim();
  }

  addProjectTask(): void {
    this.validateFields(); // Validate fields before saving

    if (this.titleInvalid || this.descriptionInvalid) {
      return; // Prevent saving if there are validation errors
    }
    // Update the projectTask dates with the converted values
    this.projectTask.startDate = this.parseDate(this.startDateString) || this.projectTask.startDate;
    this.projectTask.dueDate = this.parseDate(this.dueDateString) || this.projectTask.dueDate;

    // String to number conversion for assignedUser
    this.projectTask.assignedUserId = Number(this.projectTask.assignedUserId);

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
