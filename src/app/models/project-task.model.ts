export class ProjectTask {
  projectTaskId: number;
  projectId: number;
  title: string;
  description: string;
  status: "Not Started" | "Active" | "Completed";
  assignedUserId?: number | null;
  startDate?: Date;
  dueDate?: Date;

  constructor(
    projectTaskId: number,
    projectId: number,
    title: string,
    description: string,
    status: "Not Started" | "Active" | "Completed",
    assignedUserId?: number | null,
    startDate?: Date,
    dueDate?: Date,
  ) {
    this.projectTaskId = projectTaskId;
    this.projectId = projectId,
    this.title = title,
    this.description = description,
    this.status = status,
    this.assignedUserId = assignedUserId,
    this.startDate = startDate,
    this.dueDate = dueDate
  }
}
