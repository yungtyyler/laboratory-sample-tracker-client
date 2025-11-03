export enum SampleStatus {
  Received = "Received",
  Processing = "Processing",
  Analyzed = "Analyzed",
  Complete = "Complete",
}

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  InReview = "In Review",
  Completed = "Completed",
}

export enum PriorityChoices {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  priority: PriorityChoices;
  due_date: string;
  analyst_id: number | null;
  result_text: string | null;
  result_numeric: number | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: number;
  actor_username: string | null;
  action: string;
  timestamp: string;
}

export interface Sample {
  id: number;
  sample_id: string;
  name: string;
  owner_username: string;
  status: SampleStatus;
  created_at: string;
  updated_at: string;
  audit_logs: AuditLog[];
  tasks: Task[];
}
