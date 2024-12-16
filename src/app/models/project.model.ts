export class Project {
  projectId: number;
  projectName: string;
  description: string;
  status: "Not Started" | "Active" | "Completed";
  startDate?: Date;
  dueDate?: Date;

  constructor(
    projectId: number,
    projectName: string,
    description: string,
    status: "Not Started" | "Active" | "Completed",
    startDate?: Date,
    dueDate?: Date,
  ) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.dueDate = dueDate;
  }
}
