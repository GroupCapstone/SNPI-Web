export interface Subject {
  _id: string;
  code: string;
  name: string;
  category?: 'english' | 'computer' | 'general' | 'other';
  description?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface SubjectFilters {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}
