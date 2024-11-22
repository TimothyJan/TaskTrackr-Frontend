import { Injectable } from '@angular/core';
import { ProjectTask } from '../models/project-task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  private projectTasksChangedSource = new Subject<void>();  // Emit events when department is added
  projectTasksChanged$ = this.projectTasksChangedSource.asObservable();

  private projectTasks: ProjectTask[] = [
    { projectTaskId: 1, projectId: 1, title: 'Task 1', description: 'Task for Project Alpha', status: 'Not Started', progress: 0, startDate: new Date(), dueDate: new Date() , assignedUserId: 2 },
    { projectTaskId: 2, projectId: 1, title: 'Task 2', description: 'Another Task for Project Alpha', status: 'Active', progress: 50, startDate: new Date(), dueDate: new Date(), assignedUserId: 3 },
    { projectTaskId: 3, projectId: 2, title: 'Task 3', description: 'Task for Project Beta', status: 'Completed', progress: 100, startDate: new Date(), dueDate: new Date(), assignedUserId: null },
    { projectTaskId: 4, projectId: 2, title: 'Task 4', description: 'Another Task for Project Beta', status: 'Active', progress: 75, startDate: new Date(), dueDate: new Date(), assignedUserId: 1 },
  ];

  constructor() {}

  // Get all project tasks
  getProjectTasks(): ProjectTask[] {
    return this.projectTasks;
  }

  getListOfProjectTaskIdsByProjectIds(projectId: number): number[] {
    let listOfProjectTaskIdsByProjectIds: number[] = [];
    for (var projectTask of this.projectTasks) {
      if(projectTask.projectId === projectId) {
        listOfProjectTaskIdsByProjectIds.push(projectTask.projectTaskId);
      }
    }
    return listOfProjectTaskIdsByProjectIds;
  }

  // Get tasks by project ID
  getTasksByProjectId(projectId: number): ProjectTask[] {
    return this.projectTasks.filter((task) => task.projectId === projectId);
  }

  // Get a project task by ID
  getProjectTaskById(taskId: number): ProjectTask {
    return this.projectTasks.find((task) => task.projectTaskId === taskId)!;
  }

  // Add a new project task
  addProjectTask(newProjectTask: ProjectTask): void {
    this.projectTasks.push(newProjectTask);
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
  /** Emit events for projectTasks update */
  notifyProjectTasksChanged(): void {
    this.projectTasksChangedSource.next();
  }
}
