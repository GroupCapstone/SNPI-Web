export interface Level {
  _id: string;
  programId: string | { _id: string; code: string; nameEn: string; nameKh: string };
  code: string;
  name: string;
  description?: string;
  sequence: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface LevelFilters {
  search?: string;
  programId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
