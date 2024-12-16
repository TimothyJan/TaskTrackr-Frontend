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
    new ProjectTask(1, 1, 'Task 1', 'Task for Project Alpha', 'Completed', 2, new Date('2024-11-13'), new Date('2024-12-13')),
    new ProjectTask(2, 1, 'Task 2', 'Another Task for Project Alpha', 'Active', 3, new Date('2024-12-13'), new Date('2025-1-13')),
    new ProjectTask(3, 2, 'Task 3', 'Task for Project Beta', 'Completed', 1, new Date('2025-1-13'), new Date('2025-2-13')),
    new ProjectTask(4, 2, 'Task 4', 'Another Task for Project Beta', 'Active', 1, new Date('2024-11-13'), new Date('2025-2-13'))
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
    newProjectTask.projectTaskId = this.projectTasks.length+1;
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
  deleteProjectTask(projectTaskId: number): void {
    const index = this.projectTasks.findIndex(task => task.projectTaskId === projectTaskId);
    if (index !== -1) {
      this.projectTasks.splice(index, 1);
      this.projectTasksChangedSource.next(); // Notify subscribers that the task list has changed
    }
  }

  /** Emit events for projectTasks update */
  notifyProjectTasksChanged(): void {
    this.projectTasksChangedSource.next();
  }
}
