import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectTaskService } from '../../../services/project-task.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { ProjectTaskComponent } from '../project-task/project-task.component';
import { ProjectTaskModalComponent } from "../project-task-modal/project-task-modal.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProjectTaskComponent
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  @Input() projectId: number = 0;
  project: Project = new Project(0, "", "", "Not Started");
  listOfProjectTaskIds: number[] = [];
  editMode: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _projectTaskService: ProjectTaskService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProjectById();
    this.getListOfProjectTaskIdsByProjectId();

    // Subscribe to changes in the task list
    this._projectTaskService.projectTasksChanged$.subscribe(() => {
      this.getListOfProjectTaskIdsByProjectId(); // Refresh the list after a task is deleted
    });
  }

  /** Get Project by ID */
  getProjectById(): void {
    this.project = this._projectService.getProjectById(this.projectId);
  }

  /** Get list of ProjectTaskIds by ProjectId */
  getListOfProjectTaskIdsByProjectId(): void {
    this.listOfProjectTaskIds = this._projectTaskService.getListOfProjectTaskIdsByProjectIds(this.projectId);
  }

  /** Edit Mode */
  enterEditMode(): void {
    this.editMode = true;
  }

  /** Save project and exit editMode */
  saveChanges(): void {
    this._projectService.updateProject(this.project);
    this._projectService.notifyProjectsChanged();
    this.editMode = false; // Exit edit mode
  }

  /**Delete Project */
  deleteProject(): void {
    const confirmDelete = confirm('Are you sure you want to delete this projectTask?');
    if (confirmDelete) {
      this._projectService.deleteProject(this.project.projectId);
      this._projectService.notifyProjectsChanged();
    }
  }

  /** Open ProjectTaskModal and refresh list of ProjectTaskIds */
  openAddProjectTaskModal(): void {
    const modalRef = this.modalService.open(ProjectTaskModalComponent, {
      size: 'md',
      backdrop: 'static', // Optional: Prevent closing on outside click
      keyboard: true, // Optional: Allow closing via the Escape key
    });

    modalRef.componentInstance.projectId = this.projectId;

    modalRef.result
    .then((result) => {
      // console.log('Modal closed with result:', result);
      this.getListOfProjectTaskIdsByProjectId();
    })
    .catch((error) => {
      // console.error('Modal dismissed with error:', error);
    });
  }
}
