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
    new Project(1, 'Project Alpha', 'First project', 'Active', new Date('2024-11-13'), new Date('2025-11-13')),
    new Project(2, 'Project Beta', 'Second project', 'Active', new Date('2024-11-13'), new Date('2025-1-13')),
  ];

  constructor() {}

  // Get all projects
  getProjects(): Project[] {
    return this.projects;
  }

  /** Get list of all projectIds */
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
  addProject(newProject: Project): void {
    newProject.projectId = this.projects.length+1;
    this.projects.push(newProject);
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
    const index = this.projects.findIndex(project => project.projectId === projectId);
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.projectsChangedSource.next(); // Notify subscribers that the project list has changed
    }
  }

  /** Emit events for projects update */
  notifyProjectsChanged(): void {
    this.projectsChangedSource.next();
  }
}
