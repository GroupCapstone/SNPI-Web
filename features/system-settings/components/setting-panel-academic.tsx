'use client';

import * as React from 'react';
import type { DomainFieldDefinition } from './settings-domain-panel';
import { SettingsDomainPanel } from './settings-domain-panel';

const academicFields: DomainFieldDefinition[] = [
  {
    key: 'ACADEMIC_CURRENT_YEAR',
    label: 'Active Academic Year',
    labelKh: 'ឆ្នាំសិក្សាសកម្មបច្ចុប្បន្ន',
    description: 'Current operational academic year across classes and grading periods',
    descriptionKh: 'កូដឆ្នាំសិក្សាសកម្មសម្រាប់ថ្នាក់រៀន និងកាលវិភាគប្រឡង',
    type: 'string',
    defaultValue: 'AY-2026-2027',
    placeholder: 'AY-2026-2027',
  },
  {
    key: 'MINIMUM_PASSING_SCORE',
    label: 'Minimum Passing Score (%)',
    labelKh: 'ពិន្ទុជាប់អប្បបរមា (%)',
    description: 'Threshold score percentage required for course completion and academic promotion',
    descriptionKh: 'ភាគរយពិន្ទុអប្បបរមាដើម្បីជាប់មុខវិជ្ជា និងមានសិទ្ធិឡើងថ្នាក់',
    type: 'number',
    defaultValue: 50,
    placeholder: '50',
  },
  {
    key: 'MINIMUM_ATTENDANCE_PERCENT',
    label: 'Exam Eligibility Attendance Threshold (%)',
    labelKh: 'លក្ខខណ្ឌវត្តមានអប្បបរមាសម្រាប់ការប្រឡង (%)',
    description:
      'Minimum attended session percentage (including approved leave) required to sit for final exams',
    descriptionKh: 'ភាគរយវត្តមានអប្បបរមាដែលសិស្សត្រូវមាន ដើម្បីមានសិទ្ធិចូលរួមការប្រឡងឆមាស',
    type: 'number',
    defaultValue: 80,
    placeholder: '80',
  },
  {
    key: 'GPA_SCALE',
    label: 'Standard GPA Scale',
    labelKh: 'ប្រព័ន្ធគណនា GPA មធ្យមភាគ',
    description: 'Institutional grade point average maximum denominator',
    descriptionKh: 'ប្រព័ន្ធមាត្រដ្ឋានគណនា GPA មធ្យមភាគរបស់សាលា',
    type: 'number',
    defaultValue: 4.0,
    options: [
      {
        value: 4.0,
        label: '4.0 Scale (US / International Standard)',
        labelKh: 'មាត្រដ្ឋាន ៤.០ (ស្តង់ដារអន្តរជាតិ)',
      },
      {
        value: 10.0,
        label: '10.0 Scale (European / Continental)',
        labelKh: 'មាត្រដ្ឋាន ១០.០ (ស្តង់ដារអឺរ៉ុប)',
      },
      {
        value: 100.0,
        label: '100.0 Percentage Scale',
        labelKh: 'មាត្រដ្ឋាន ១០០ (ភាគរយ)',
      },
    ],
  },
  {
    key: 'TERMS_PER_YEAR',
    label: 'Academic Terms per Year',
    labelKh: 'ចំនួនឆមាសក្នុងមួយឆ្នាំសិក្សា',
    description: 'Standard number of semesters or terms dividing an academic school year',
    descriptionKh: 'ចំនួនឆមាស ឬត្រីមាសបែងចែកក្នុងមួយឆ្នាំសិក្សា',
    type: 'number',
    defaultValue: 2,
    options: [
      {
        value: 2,
        label: '2 Semesters (Standard MoEYS / International)',
        labelKh: '២ ឆមាស (ស្តង់ដារក្រសួងអប់រំ / អន្តរជាតិ)',
      },
      { value: 3, label: '3 Trimesters', labelKh: '៣ ត្រីមាស' },
      { value: 4, label: '4 Quarters', labelKh: '៤ ត្រីមាសតូច' },
    ],
  },
  {
    key: 'CLASS_DEFAULT_CAPACITY',
    label: 'Default Classroom Seat Capacity',
    labelKh: 'ចំណុះសិស្សស្តង់ដារក្នុងមួយថ្នាក់',
    description: 'Default maximum enrollment quota when creating new class sections',
    descriptionKh: 'ចំនួនកំណត់សិស្សអតិបរមាលំនាំដើមពេលបង្កើតបន្ទប់ថ្នាក់រៀនថ្មី',
    type: 'number',
    defaultValue: 30,
    placeholder: '30',
  },
];

export const SettingPanelAcademic = () => {
  return (
    <SettingsDomainPanel
      title="Academic & Evaluation Policies"
      titleKh="គោលការណ៍សិក្សា & ការវាយតម្លៃ"
      description="Define passing thresholds, exam eligibility criteria, GPA scaling, and term structures"
      descriptionKh="កំណត់លក្ខខណ្ឌពិន្ទុជាប់ អវត្តមានសម្រាប់ការប្រឡង ប្រព័ន្ធ GPA និងរចនាសម្ព័ន្ធឆមាស"
      category="academic"
      fields={academicFields}
    />
  );
};
