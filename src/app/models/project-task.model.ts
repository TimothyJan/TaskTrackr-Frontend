export interface ProjectTask {
  projectTaskId: number;
  projectId: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  assignedUserId?: number | null;
}
