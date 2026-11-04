export type IntakeStatus = 'planned' | 'open' | 'closed' | 'archived';

export interface Intake {
  _id: string;
  code: string;
  name: string;
  academicPeriodId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
        type: string;
      };
  academicYearId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
      };
  programId:
    | string
    | {
        _id: string;
        nameEn: string;
        nameKh: string;
        code: string;
      };
  levelId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
        sequence: number;
      };
  curriculumId?:
    | string
    | {
        _id: string;
        name: string;
        code: string;
      };
  branchId:
    | string
    | {
        _id: string;
        branchNameEn: string;
        branchCode: string;
      };
  startDate: string;
  endDate: string;
  capacity?: number;
  status: IntakeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIntakeInput {
  code: string;
  name: string;
  academicPeriodId: string;
  academicYearId: string;
  programId: string;
  levelId: string;
  curriculumId?: string;
  branchId: string;
  startDate: string;
  endDate: string;
  capacity?: number;
  status?: IntakeStatus;
}

export type UpdateIntakeInput = Partial<CreateIntakeInput>;
