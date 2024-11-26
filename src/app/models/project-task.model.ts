export class ProjectTask {
  projectTaskId: number;
  projectId: number;
  title: string;
  description: string;
  status: "Not Started" | "Active" | "Completed";
  progress: number;
  startDate?: Date;
  dueDate?: Date;
  assignedUserId?: number | null;

  constructor(
    projectTaskId: number,
    projectId: number,
    title: string,
    description: string,
    status: "Not Started" | "Active" | "Completed",
    progress: number,
    startDate?: Date,
    dueDate?: Date,
    assignedUserId?: number | null
  ) {
    this.projectTaskId = projectTaskId;
    this.projectId = projectId,
    this.title = title,
    this.description = description,
    this.status = status,
    this.progress = progress,
    this.startDate = startDate,
    this.dueDate = dueDate,
    this.assignedUserId = assignedUserId
  }
}
