import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsChangedSource = new Subject<void>();  // Emit events when department is added
  projectsChanged$ = this.projectsChangedSource.asObservable();

  private projects: Project[] = [
    { projectId: 1, projectName: 'Project Alpha', description: 'First project', status: 'Active' },
    { projectId: 2, projectName: 'Project Beta', description: 'Second project', status: 'Completed' },
  ];

  constructor() {}

  // Get all projects
  getProjects(): Project[] {
    return this.projects;
  }

  getListOfProjectIds(): number[] {
    let listOfProjectIds: number[] = [];
    this.projects.forEach((project) => {
      listOfProjectIds.push(project.projectId);
    });
    return listOfProjectIds;
  }

  // Get a project by ID
  getProjectById(projectId: number): Project {
    return this.projects.find((project) => project.projectId === projectId)!;
  }

  // Add a new project
  addProject(project: Project): void {
    this.projects.push(project);
  }

  // Update an existing project
  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex((project) => project.projectId === updatedProject.projectId);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  // Delete a project
  deleteProject(projectId: number): void {
    this.projects = this.projects.filter((project) => project.projectId !== projectId);
  }

  /** Emit events for projects update */
  notifyProjectsChanged(): void {
    this.projectsChangedSource.next();
  }
}
