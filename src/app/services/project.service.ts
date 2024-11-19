import { Injectable } from '@angular/core';
import { ProjectTask } from '../models/project-task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectTasks: ProjectTask[] = [
    { projectTaskId: 1, projectId: 1, title: 'Task 1', description: 'Task for Project Alpha', status: 'Not Started', progress: 0, assignedUserId: 2 },
    { projectTaskId: 2, projectId: 1, title: 'Task 2', description: 'Another Task for Project Alpha', status: 'In Progress', progress: 50, assignedUserId: 3 },
    { projectTaskId: 3, projectId: 2, title: 'Task 3', description: 'Task for Project Beta', status: 'Completed', progress: 100, assignedUserId: null },
    { projectTaskId: 4, projectId: 2, title: 'Task 4', description: 'Another Task for Project Beta', status: 'In Progress', progress: 75, assignedUserId: 1 },
  ];

  constructor() {}

  // Get all project tasks
  getProjectTasks(): ProjectTask[] {
    return this.projectTasks;
  }

  // Get tasks by project ID
  getTasksByProjectId(projectId: number): ProjectTask[] {
    return this.projectTasks.filter((task) => task.projectId === projectId);
  }

  // Get a project task by ID
  getProjectTaskById(taskId: number): ProjectTask | undefined {
    return this.projectTasks.find((task) => task.projectTaskId === taskId);
  }

  // Add a new project task
  addProjectTask(task: ProjectTask): void {
    this.projectTasks.push(task);
  }

  // Update an existing project task
  updateProjectTask(updatedTask: ProjectTask): void {
    const index = this.projectTasks.findIndex((task) => task.projectTaskId === updatedTask.projectTaskId);
    if (index !== -1) {
      this.projectTasks[index] = updatedTask;
    }
  }

  // Delete a project task
  deleteProjectTask(taskId: number): void {
    this.projectTasks = this.projectTasks.filter((task) => task.projectTaskId !== taskId);
  }
}
