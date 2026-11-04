export type SystemSettingCategory =
  | 'general'
  | 'academic'
  | 'finance'
  | 'student'
  | 'employee'
  | 'security'
  | 'notification'
  | 'document'
  | 'sequence';
export type SystemSettingType = 'string' | 'number' | 'boolean' | 'json' | 'date';
export type SystemSettingValue = string | number | boolean | Record<string, unknown> | unknown[];

export interface SystemSetting {
  _id: string;
  key: string;
  value: SystemSettingValue;
  type: SystemSettingType;
  category: SystemSettingCategory;
  schoolId: string;
  branchId?: string | { _id: string; branchCode: string; branchNameEn: string };
  description?: string;
  isEditable: boolean;
  auditHistory: Array<{
    oldValue?: SystemSettingValue;
    newValue: SystemSettingValue;
    updatedBy: string;
    updatedAt: string;
  }>;
  updatedAt: string;
}

export interface SystemSettingInput {
  key: string;
  value: SystemSettingValue;
  type: SystemSettingType;
  category: SystemSettingCategory;
  schoolId: string;
  branchId?: string;
  description?: string;
  isEditable?: boolean;
}
