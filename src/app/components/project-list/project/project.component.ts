import { Component, Input, OnInit } from '@angular/core';
import { ProjectTask } from '../../../models/project-task.model';
import { ProjectTaskService } from '../../../services/project-task.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';
import { ProjectTaskComponent } from "./project-task/project-task.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ProjectTaskComponent
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  @Input() projectId: number = 0;
  project: Project = new Project(0, "", "", "Not Started");
  listOfProjectTaskIds: number[] = [];

  constructor(
    private _projectService: ProjectService,
    private _projectTaskService: ProjectTaskService
  ) {}

  ngOnInit(): void {
    this.getProjectById();
    this.getListOfProjectTaskIdsByProjectId();
  }

  getProjectById(): void {
    this.project = this._projectService.getProjectById(this.projectId);
  }

  getListOfProjectTaskIdsByProjectId(): void {
    this.listOfProjectTaskIds = this._projectTaskService.getListOfProjectTaskIdsByProjectIds(this.projectId);
  }

  addProjectTask(newProjectTask: ProjectTask): void {
    this._projectTaskService.addProjectTask(newProjectTask);
  }

}
