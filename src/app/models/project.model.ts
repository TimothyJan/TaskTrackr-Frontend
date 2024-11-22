export class Project {
  projectId: number;
  projectName: string;
  description: string;
  status: "Not Started" | "Active" | "Completed";

  constructor(
    projectId: number,
    projectName: string,
    description: string,
    status: "Not Started" | "Active" | "Completed"
  ) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.description = description;
    this.status = status;
  }
}
