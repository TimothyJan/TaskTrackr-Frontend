import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../../models/project.model';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  project: Project = new Project(0, "", "", "Not Started");

  nameInvalid: boolean = false;
  descriptionInvalid: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private _projectService: ProjectService
  ) {}

  /** Validation for name and description */
  validateFields(): void {
    this.nameInvalid = !this.project.projectName.trim();
    this.descriptionInvalid = !this.project.description.trim();
  }

  /** Clear the form */
  clearForm(): void {
    this.project = new Project(0, "", "", "Not Started");
  }

  /** Add Project */
  addProject(): void {
    this.validateFields(); // Validate fields before saving

    if (this.nameInvalid || this.descriptionInvalid) {
      return; // Prevent saving if there are validation errors
    }

    this._projectService.addProject(this.project);

    this.closeModal();
  }

  /** Close the Modal */
  closeModal(): void {
    this.activeModal.close(); // Pass result back to parent
  }

}
