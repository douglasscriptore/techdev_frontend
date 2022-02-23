export interface DeveloperItem {
  id: number;
  fullname: string;
  gender: 'masculino' | 'feminino' | 'outro';
  dateofborn: Date;
  age: number;
  level_id: number;
  level?: {
    id: number;
    levelname: string;
  };
}
