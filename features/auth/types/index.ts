export interface PopulatedSchool {
  _id: string;
  code: string;
  nameEn: string;
  nameKh?: string;
}

export interface PopulatedEmployee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  khmerName?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  schoolId: PopulatedSchool | string;
  employeeId?: PopulatedEmployee | string;
  roles: string[];
  permissions: string[];
  branchAccess: 'all' | string[];
  departmentAccess: 'all' | string[];
  assignedClasses: string[];
  assignedSubjects: string[];
  defaultBranch: string | null;
  isSuperAdmin: boolean;
  status: string;
  lastLoginAt?: string;
  mustChangePassword: boolean;
  twoFactorEnabled?: boolean;
  telegramChatId?: string | null;
}

export interface LoginResponseData {
  user?: AuthUser;
  accessToken?: string;
  mfaRequired?: boolean;
  mfaToken?: string;
  telegramAvailable?: boolean;
}

export interface Setup2FaResponse {
  success: boolean;
  message: string;
  data: {
    secret: string;
    otpauthUri: string;
    qrCodeDataUrl: string; // Base64 PNG data URL for <img src="..." />
    backupCodes: string[]; // 8 single-use codes e.g. ["8F2K-92JA", ...]
  };
}

export interface Verify2FaPayload {
  mfaToken: string;
  code: string; // 6-digit TOTP, 8-char backup code (XXXX-XXXX), or 6-digit Telegram OTP
}

export interface Disable2FaPayload {
  password: string; // Required account password
  code: string; // Required live 6-digit code or backup code
}

export interface LinkTelegramPayload {
  telegramChatId: string;
}

export interface AuthApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
