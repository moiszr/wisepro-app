// tasks.interface.ts
export interface Tasks {
  tasks_id: number;
  title: string | null;
  description: string | null;
  creation_date: Date | null;
  priority: string | null;
  type: string | null;
  expiration_date: Date | null;
  status: string | null;
  user_id: string | null;
}