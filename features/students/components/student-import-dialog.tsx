'use client';

import * as React from 'react';
import { readSheet } from 'read-excel-file/browser';
import writeXlsxFile, { Row } from 'write-excel-file/browser';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Sparkles,
  Upload,
  UserCheck,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import type { School } from '@/features/school/types';

import { useConfirmImportMutation, usePreviewImportMutation } from '../hooks/use-students';
import type { ConfirmImportResponse, ImportPreviewResponse, RawImportStudentRow } from '../types';

interface StudentImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

export const StudentImportDialog: React.FC<StudentImportDialogProps> = ({
  open,
  onOpenChange,
  onImportComplete,
}) => {
  const { user, currentBranchId } = useAuth();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = schoolsData?.data ?? [];

  const { data: branchesData } = useBranchesQuery({ limit: 50 });
  const allBranches = branchesData?.data ?? [];

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const [selectedSchoolId, setSelectedSchoolId] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState('');

  const schoolId = selectedSchoolId || schools[0]?._id || '';
  const branchId =
    selectedBranchId || (currentBranchId !== 'all' ? currentBranchId : branches[0]?._id || '');

  // Upload State
  const [fileName, setFileName] = React.useState<string>('');
  const [parsedHeaders, setParsedHeaders] = React.useState<string[]>([]);
  const [rawRows, setRawRows] = React.useState<Record<string, string>[]>([]);

  // Column Mapping
  const [fieldMapping, setFieldMapping] = React.useState<Record<string, string>>({
    khmerName: '',
    englishName: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    birthplaceProvince: '',
    birthplaceDistrict: '',
    currentProvince: '',
    currentDistrict: '',
    guardianName: '',
    guardianRelationship: '',
    guardianPhone: '',
  });

  // Validation Preview State
  const previewMutation = usePreviewImportMutation();
  const [previewResult, setPreviewResult] = React.useState<ImportPreviewResponse | null>(null);

  // Import Confirmation State
  const confirmMutation = useConfirmImportMutation();
  const [importResult, setImportResult] = React.useState<ConfirmImportResponse | null>(null);
  const [skipDuplicates, setSkipDuplicates] = React.useState(true);
  const [activeTabFilter, setActiveTabFilter] = React.useState<
    'all' | 'valid' | 'warning' | 'error' | 'duplicate'
  >('all');

  const resetState = () => {
    setStep(1);
    setFileName('');
    setParsedHeaders([]);
    setRawRows([]);
    setPreviewResult(null);
    setImportResult(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    try {
      const rows = await readSheet(file);
      if (rows.length === 0) {
        alert('Excel file is empty!');
        return;
      }

      const [headerRow, ...dataRows] = rows;
      const headers = (headerRow || []).map((h: unknown) => String(h ?? '').trim());
      if (headers.length === 0) {
        alert('Excel file has no headers!');
        return;
      }

      const json: Record<string, string>[] = (dataRows as (unknown[] | null)[])
        .filter(
          (row): row is unknown[] =>
            Array.isArray(row) &&
            row.some((cell) => cell !== null && cell !== undefined && String(cell).trim() !== ''),
        )
        .map((row) => {
          const obj: Record<string, string> = {};
          headers.forEach((header: string, idx: number) => {
            const val = row[idx];
            obj[header] =
              val instanceof Date ? val.toISOString().split('T')[0] : String(val ?? '').trim();
          });
          return obj;
        });

      if (json.length === 0) {
        alert('Excel file has no data rows!');
        return;
      }

      setParsedHeaders(headers);
      setRawRows(json);

      // Auto-guess column mappings
      const autoMap: Record<string, string> = { ...fieldMapping };
      headers.forEach((h) => {
        const lower = h.toLowerCase().trim();
        if (
          lower.includes('khmer') ||
          lower.includes('ខ្មែរ') ||
          lower.includes('ឈ្មោះ') ||
          lower.includes('name_kh')
        ) {
          if (!autoMap.khmerName) autoMap.khmerName = h;
        }
        if (
          lower.includes('english') ||
          lower.includes('name_en') ||
          lower.includes('latin') ||
          lower.includes('eng')
        ) {
          if (!autoMap.englishName) autoMap.englishName = h;
        }
        if (lower.includes('first') || lower.includes('fname')) {
          if (!autoMap.firstName) autoMap.firstName = h;
        }
        if (lower.includes('last') || lower.includes('lname') || lower.includes('surname')) {
          if (!autoMap.lastName) autoMap.lastName = h;
        }
        if (lower.includes('gender') || lower.includes('sex') || lower.includes('ភេទ')) {
          if (!autoMap.gender) autoMap.gender = h;
        }
        if (
          lower.includes('dob') ||
          lower.includes('birth') ||
          lower.includes('កំណើត') ||
          lower.includes('date')
        ) {
          if (!autoMap.dateOfBirth) autoMap.dateOfBirth = h;
        }
        if (
          lower.includes('phone') ||
          lower.includes('tel') ||
          lower.includes('ទូរស័ព្ទ') ||
          lower.includes('mobile')
        ) {
          if (!autoMap.phone) autoMap.phone = h;
        }
        if (lower.includes('province') || lower.includes('ខេត្ត') || lower.includes('pob')) {
          if (!autoMap.birthplaceProvince) autoMap.birthplaceProvince = h;
        }
        if (
          lower.includes('guardian') ||
          lower.includes('parent') ||
          lower.includes('អាណាព្យាបាល') ||
          lower.includes('ឪពុក')
        ) {
          if (!autoMap.guardianName) autoMap.guardianName = h;
        }
      });
      setFieldMapping(autoMap);
      setStep(2);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to parse Excel file: ' + errorMsg);
    }
  };

  const handleGeneratePreview = async () => {
    if (!schoolId || !branchId) {
      alert('Please select both School and Campus Branch');
      return;
    }

    const mappedRows: RawImportStudentRow[] = rawRows.map((r, i) => ({
      rowNumber: i + 1,
      khmerName: r[fieldMapping.khmerName || ''] || '',
      englishName: r[fieldMapping.englishName || ''] || undefined,
      firstName: r[fieldMapping.firstName || ''] || undefined,
      lastName: r[fieldMapping.lastName || ''] || undefined,
      gender: r[fieldMapping.gender || ''] || undefined,
      dateOfBirth: r[fieldMapping.dateOfBirth || ''] || undefined,
      phone: r[fieldMapping.phone || ''] || undefined,
      email: r[fieldMapping.email || ''] || undefined,
      birthplaceProvince: r[fieldMapping.birthplaceProvince || ''] || undefined,
      birthplaceDistrict: r[fieldMapping.birthplaceDistrict || ''] || undefined,
      currentProvince: r[fieldMapping.currentProvince || ''] || undefined,
      currentDistrict: r[fieldMapping.currentDistrict || ''] || undefined,
      guardianName: r[fieldMapping.guardianName || ''] || undefined,
      guardianRelationship: r[fieldMapping.guardianRelationship || ''] || undefined,
      guardianPhone: r[fieldMapping.guardianPhone || ''] || undefined,
    }));

    try {
      const res = await previewMutation.mutateAsync({
        schoolId,
        branchId,
        rows: mappedRows,
      });
      setPreviewResult(res.data);
      setStep(3);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            'Validation analysis failed';
      alert(errorMsg);
    }
  };

  const handleConfirmImport = async () => {
    if (!previewResult || !schoolId || !branchId) return;

    const validRows = previewResult.rows.filter((r) => r.validationStatus !== 'error');

    try {
      const res = await confirmMutation.mutateAsync({
        schoolId,
        branchId,
        skipDuplicates,
        rows: validRows.map((r) => ({
          khmerName: r.khmerName,
          firstName: r.firstName,
          lastName: r.lastName,
          gender: r.gender,
          dateOfBirth: r.dateOfBirth,
          phone: r.phone,
          email: r.email,
          birthplace: r.birthplace,
          currentAddress: r.currentAddress,
          guardians: r.guardians,
          admissionDate: r.admissionDate,
          status: r.status,
        })),
      });
      setImportResult(res.data);
      setStep(4);
      if (onImportComplete) {
        onImportComplete();
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            'Import execution failed';
      alert(errorMsg);
    }
  };

  const handleDownloadSample = async () => {
    const sampleHeaders = [
      'Khmer Name',
      'English Name',
      'Gender',
      'DOB',
      'Student Phone',
      'Birth Province',
      'Guardian Name',
      'Guardian Phone',
      'Relationship',
    ];
    const sampleRows = [
      [
        'សុក ចាន់ដារា',
        'Sok Dara',
        'ប្រុស',
        '2012-05-14',
        '012345678',
        'Phnom Penh',
        'Sok Visal',
        '098765432',
        'father',
      ],
      [
        'គង់ ស្រីនិច',
        'Kong Sreynich',
        'ស្រី',
        '2013-09-22',
        '077889900',
        'Kandal',
        'Kong Samnang',
        '012998877',
        'mother',
      ],
    ];

    const data: Row[] = [
      sampleHeaders.map((h) => ({ value: h, type: String, fontWeight: 'bold' as const })),
      ...sampleRows.map((row) => row.map((v) => ({ value: v, type: String }))),
    ];

    await writeXlsxFile(data).toFile('snp_students_template.xlsx');
  };

  const filteredPreviewRows = React.useMemo(() => {
    if (!previewResult) return [];
    if (activeTabFilter === 'all') return previewResult.rows;
    return previewResult.rows.filter((r) => r.validationStatus === activeTabFilter);
  }, [previewResult, activeTabFilter]);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) resetState();
        onOpenChange(val);
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="text-primary h-6 w-6" />
              <div>
                <DialogTitle className="text-lg font-bold">
                  Import Students from Excel (XLSX / CSV)
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Robust 4-stage pipeline: Upload → Column Mapping → Normalization & Duplicate
                  Validation → Confirmed Import
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* STEPPER PROGRESS */}
        <div className="bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border px-2 py-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-semibold ${step >= 1 ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
            >
              1
            </div>
            <span className="text-xs font-semibold">Upload</span>
          </div>
          <div className="bg-border h-0.5 w-8" />
          <div className="flex items-center gap-1.5">
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-semibold ${step >= 2 ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
            >
              2
            </div>
            <span className="text-xs font-semibold">Map Columns</span>
          </div>
          <div className="bg-border h-0.5 w-8" />
          <div className="flex items-center gap-1.5">
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-semibold ${step >= 3 ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
            >
              3
            </div>
            <span className="text-xs font-semibold">Validate</span>
          </div>
          <div className="bg-border h-0.5 w-8" />
          <div className="flex items-center gap-1.5">
            <div
              className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-semibold ${step >= 4 ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
            >
              4
            </div>
            <span className="text-xs font-semibold">Summary Report</span>
          </div>
        </div>

        {/* STEP 1: UPLOAD */}
        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Destination School</label>
                <Select
                  value={schoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}
                  className="text-xs"
                >
                  {schools.map((s: School) => (
                    <option key={s._id} value={s._id}>
                      {s.nameEn} ({s.code})
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Destination Campus Branch</label>
                <Select
                  value={branchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="text-xs"
                >
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn} ({b.branchCode})
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="border-border hover:border-primary/60 bg-muted/10 flex flex-col items-center justify-center space-y-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Drag & drop your Excel file here</h4>
                <p className="text-muted-foreground mt-1 text-xs">
                  Supports .xlsx, .xls, and .csv files containing student rosters
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="pointer-events-none gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Browse Excel File
                </Button>
              </label>
            </div>

            <div className="bg-muted/20 flex items-center justify-between rounded-lg border p-3 text-xs">
              <div>
                <span className="font-semibold">Need a template?</span>
                <p className="text-muted-foreground">
                  Download a pre-formatted Excel template with standard columns.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownloadSample}
                className="h-8 gap-1.5 text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                Download Template
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: COLUMN MAPPING */}
        {step === 2 && (
          <div className="space-y-4 py-2">
            <div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded-lg border p-3 text-xs">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-primary h-4 w-4" />
                <span className="font-medium">
                  File: <span className="font-mono">{fileName}</span> ({rawRows.length} rows
                  detected)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="h-7 text-xs"
              >
                Change File
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">
              Match the columns from your Excel file to the SNP-SMS Student Master fields.
            </p>

            <div className="grid max-h-80 grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
              {[
                { field: 'khmerName', label: 'Khmer Name (ឈ្មោះខ្មែរ)', required: true },
                { field: 'englishName', label: 'English Full Name', required: false },
                { field: 'firstName', label: 'English First Name', required: false },
                { field: 'lastName', label: 'English Last Name', required: false },
                { field: 'gender', label: 'Gender (ភេទ: ប្រុស / ស្រី)', required: false },
                { field: 'dateOfBirth', label: 'Date of Birth (ថ្ងៃខែឆ្នាំកំណើត)', required: true },
                { field: 'phone', label: 'Student Phone Number', required: false },
                {
                  field: 'birthplaceProvince',
                  label: 'Place of Birth / Province',
                  required: false,
                },
                { field: 'guardianName', label: 'Guardian / Parent Name', required: false },
                { field: 'guardianPhone', label: 'Guardian Phone Number', required: false },
                { field: 'guardianRelationship', label: 'Guardian Relationship', required: false },
              ].map(({ field, label, required }) => (
                <div
                  key={field}
                  className="bg-card flex items-center justify-between rounded-md border p-2.5 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-medium">{label}</span>
                    {required && <span className="text-destructive ml-1">*</span>}
                  </div>
                  <Select
                    value={fieldMapping[field] || ''}
                    onChange={(e) =>
                      setFieldMapping((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                    className="h-8 max-w-44 text-xs"
                  >
                    <option value="">-- Unmapped --</option>
                    {parsedHeaders.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>

            <DialogFooter className="border-t pt-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} size="sm">
                Back
              </Button>
              <Button
                type="button"
                onClick={handleGeneratePreview}
                disabled={previewMutation.isPending}
                size="sm"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {previewMutation.isPending ? 'Analyzing & Validating...' : 'Analyze & Validate'}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* STEP 3: NORMALIZE & VALIDATE */}
        {step === 3 && previewResult && (
          <div className="space-y-4 py-2">
            {/* KPI Badges */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-5">
              <div
                onClick={() => setActiveTabFilter('all')}
                className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                  activeTabFilter === 'all'
                    ? 'border-primary bg-primary/10 font-bold'
                    : 'bg-muted/30 border-border hover:bg-muted/60'
                }`}
              >
                <div className="text-lg font-bold">{previewResult.totalRows}</div>
                <div className="text-muted-foreground text-xs">Total Rows</div>
              </div>

              <div
                onClick={() => setActiveTabFilter('valid')}
                className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                  activeTabFilter === 'valid'
                    ? 'border-emerald-500 bg-emerald-500/10 font-bold text-emerald-700'
                    : 'bg-muted/30 border-border hover:bg-muted/60'
                }`}
              >
                <div className="text-lg font-bold text-emerald-600">{previewResult.validCount}</div>
                <div className="text-muted-foreground text-xs">Clean & Ready</div>
              </div>

              <div
                onClick={() => setActiveTabFilter('warning')}
                className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                  activeTabFilter === 'warning'
                    ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-700'
                    : 'bg-muted/30 border-border hover:bg-muted/60'
                }`}
              >
                <div className="text-lg font-bold text-amber-600">{previewResult.warningCount}</div>
                <div className="text-muted-foreground text-xs">Warnings</div>
              </div>

              <div
                onClick={() => setActiveTabFilter('duplicate')}
                className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                  activeTabFilter === 'duplicate'
                    ? 'border-orange-500 bg-orange-500/10 font-bold text-orange-700'
                    : 'bg-muted/30 border-border hover:bg-muted/60'
                }`}
              >
                <div className="text-lg font-bold text-orange-600">
                  {previewResult.duplicateCount}
                </div>
                <div className="text-muted-foreground text-xs">Duplicates</div>
              </div>

              <div
                onClick={() => setActiveTabFilter('error')}
                className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                  activeTabFilter === 'error'
                    ? 'border-red-500 bg-red-500/10 font-bold text-red-700'
                    : 'bg-muted/30 border-border hover:bg-muted/60'
                }`}
              >
                <div className="text-lg font-bold text-red-600">{previewResult.errorCount}</div>
                <div className="text-muted-foreground text-xs">Blocking Errors</div>
              </div>
            </div>

            {/* Validation Table */}
            <div className="max-h-72 overflow-y-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/40 text-xs">
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Khmer Name</TableHead>
                    <TableHead>English Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Guardian</TableHead>
                    <TableHead>Validation Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {filteredPreviewRows.map((row) => (
                    <TableRow
                      key={row.rowNumber}
                      className={
                        row.validationStatus === 'error'
                          ? 'bg-red-500/5'
                          : row.validationStatus === 'duplicate'
                            ? 'bg-orange-500/5'
                            : row.validationStatus === 'warning'
                              ? 'bg-amber-500/5'
                              : ''
                      }
                    >
                      <TableCell className="text-muted-foreground font-mono">
                        {row.rowNumber}
                      </TableCell>
                      <TableCell className="font-medium">{row.khmerName}</TableCell>
                      <TableCell>{`${row.lastName} ${row.firstName}`}</TableCell>
                      <TableCell className="capitalize">{row.gender}</TableCell>
                      <TableCell className="font-mono">
                        {new Date(row.dateOfBirth).toISOString().slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        <div className="flex min-w-0 flex-col">
                          <span className="font-medium text-slate-800">
                            {row.guardians[0]?.fullName || '—'}
                          </span>
                          {row.guardians[0]?.relationship && (
                            <span className="text-xs text-slate-500">
                              {row.guardians[0].relationship}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {row.validationStatus === 'valid' && (
                          <Badge tone="success" className="gap-1 text-xs">
                            <CheckCircle2 className="h-3 w-3" /> Valid
                          </Badge>
                        )}
                        {row.validationStatus === 'warning' && (
                          <div className="space-y-0.5">
                            <Badge tone="warning" className="gap-1 text-xs">
                              <AlertTriangle className="h-3 w-3" /> Warning
                            </Badge>
                            {row.issues.map((iss, idx) => (
                              <div key={idx} className="text-xs text-amber-700">
                                {iss.message}
                              </div>
                            ))}
                          </div>
                        )}
                        {row.validationStatus === 'duplicate' && (
                          <div className="space-y-0.5">
                            <Badge tone="warning" className="gap-1 text-xs">
                              <AlertCircle className="h-3 w-3" /> Duplicate
                            </Badge>
                            {row.duplicateMatch && (
                              <div className="text-xs text-orange-700">
                                Matches {row.duplicateMatch.studentId} (
                                {row.duplicateMatch.matchReasons.join(', ')})
                              </div>
                            )}
                          </div>
                        )}
                        {row.validationStatus === 'error' && (
                          <div className="space-y-0.5">
                            <Badge tone="danger" className="gap-1 text-xs">
                              <X className="h-3 w-3" /> Error
                            </Badge>
                            {row.issues.map((iss, idx) => (
                              <div key={idx} className="text-xs text-rose-700">
                                {iss.message}
                              </div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Skip Duplicate Options */}
            <div className="bg-muted/20 flex items-center justify-between rounded-lg border p-3 text-xs">
              <label className="flex cursor-pointer items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="text-primary h-4 w-4 rounded border-gray-300"
                />
                <span>Skip existing duplicate records during import</span>
              </label>
              <div className="text-muted-foreground text-xs">
                Valid rows to import:{' '}
                <span className="text-foreground font-bold">
                  {previewResult.validCount + previewResult.warningCount}
                </span>{' '}
                / {previewResult.totalRows}
              </div>
            </div>

            <DialogFooter className="border-t pt-3">
              <Button type="button" variant="outline" onClick={() => setStep(2)} size="sm">
                Back to Mapping
              </Button>
              <Button
                type="button"
                onClick={handleConfirmImport}
                disabled={confirmMutation.isPending || previewResult.validCount === 0}
                size="sm"
                className="gap-2"
              >
                <UserCheck className="h-4 w-4" />
                {confirmMutation.isPending ? 'Importing Students...' : 'Confirm & Import Students'}
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* STEP 4: IMPORT REPORT SUMMARY */}
        {step === 4 && importResult && (
          <div className="space-y-4 py-4 text-center">
            <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold">Student Import Completed Successfully!</h3>
              <p className="text-muted-foreground mt-1 text-xs">
                Processed {importResult.totalProcessed} records into the SNP-SMS database.
              </p>
            </div>

            <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 text-left text-xs">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="text-sm font-semibold text-emerald-700">
                  {importResult.importedCount}
                </div>
                <div className="text-muted-foreground text-xs">Successfully Created</div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="text-sm font-semibold text-amber-700">
                  {importResult.skippedCount}
                </div>
                <div className="text-muted-foreground text-xs">Skipped (Duplicates)</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                <div className="text-sm font-semibold text-rose-700">
                  {importResult.errors.length}
                </div>
                <div className="text-muted-foreground text-xs">Errors</div>
              </div>
            </div>

            {importResult.createdStudents.length > 0 && (
              <div className="max-h-48 overflow-y-auto rounded-lg border text-left">
                <Table>
                  <TableHeader className="bg-muted/40 text-xs">
                    <TableRow>
                      <TableHead>Generated Student ID</TableHead>
                      <TableHead>Khmer Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {importResult.createdStudents.map((st) => (
                      <TableRow key={st.id}>
                        <TableCell className="text-primary font-mono font-bold">
                          {st.studentId}
                        </TableCell>
                        <TableCell className="font-medium">{st.khmerName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <DialogFooter className="justify-center border-t pt-4">
              <Button
                type="button"
                onClick={() => {
                  resetState();
                  onOpenChange(false);
                }}
                size="sm"
              >
                Close & View Students
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
