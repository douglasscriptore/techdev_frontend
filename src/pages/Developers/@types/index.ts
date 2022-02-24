export interface DeveloperItem {
  id: number;
  fullname: string;
  gender: 'masculino' | 'feminino' | 'outro';
  dateofborn: Date;
  age: number;
  level_id: number;
  created_at: string;
  level?: {
    id: number;
    levelname: string;
  };
}
