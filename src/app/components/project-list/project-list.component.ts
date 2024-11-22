import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectTaskService } from '../../services/project-task.service';
import { ProjectTask } from '../../models/project-task.model';
import { ProjectComponent } from "./project/project.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent
],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  listOfProjectIds: number[] = [];

  constructor(
    private _projectService: ProjectService,
    private _projectTaskService: ProjectTaskService
  ) {}

  ngOnInit(): void {
      this.getListOfProjectIds();
  }

  getListOfProjectIds(): void {
    this.listOfProjectIds = this._projectService.getListOfProjectIds();
  }

  // addProject() {
  //   const newProject: Project = {
  //     projectId: Date.now(),
  //     projectName: `Project ${this.projects.length + 1}`,
  //     description: 'New project description',
  //     status: 'Active'
  //   };
  //   this.projects.push(newProject);
  // }

  // editProject(project: Project) {
  //   alert(`Editing project: ${project.projectName}`);
  // }

  // deleteProject(projectId: number) {
  //   this.projects = this.projects.filter(p => p.projectId !== projectId);
  // }

  // addTask(projectId: number) {
  //   alert(`Adding task to project ID: ${projectId}`);
  // }
}
