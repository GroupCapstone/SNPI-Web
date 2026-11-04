'use client';

import * as React from 'react';
import type { DomainFieldDefinition } from './settings-domain-panel';
import { SettingsDomainPanel } from './settings-domain-panel';

const generalFields: DomainFieldDefinition[] = [
  {
    key: 'SCHOOL_NAME_EN',
    label: 'School Name (English)',
    labelKh: 'ឈ្មោះសាលា (អង់គ្លេស)',
    description:
      'Primary institutional brand name used across English report cards, invoices, and certificates',
    descriptionKh:
      'ឈ្មោះផ្លូវការជាភាសាអង់គ្លេស ប្រើប្រាស់លើវិក្កយបត្រ ព្រឹត្តិបត្រពិន្ទុ និងវិញ្ញាបនបត្រ',
    type: 'string',
    defaultValue: 'SNPI International School',
    placeholder: 'e.g. SNPI International School',
  },
  {
    key: 'SCHOOL_NAME_KH',
    label: 'School Name (Khmer)',
    labelKh: 'ឈ្មោះសាលា (ខ្មែរ)',
    description: 'Official Ministry-registered institutional name in Khmer language',
    descriptionKh: 'ឈ្មោះផ្លូវការចុះបញ្ជីនៅក្រសួងអប់រំជាភាសាខ្មែរ',
    type: 'string',
    defaultValue: 'សាលាអន្តរជាតិ អេស អិន ភី',
    placeholder: 'ឧ. សាលាអន្តរជាតិ អេស អិន ភី',
  },
  {
    key: 'SCHOOL_CODE',
    label: 'School Code (Unique)',
    labelKh: 'កូដសម្គាល់សាលា (អត្តសញ្ញាណប្រព័ន្ធ)',
    description: 'Unique institutional identifier code used in codes, prefixes, and student IDs',
    descriptionKh: 'កូដសម្គាល់ប្រព័ន្ធសាលា (មិនអាចកែប្រែបាន)',
    type: 'string',
    defaultValue: 'SNP',
    isReadOnly: true,
  },
  {
    key: 'SCHOOL_EMAIL',
    label: 'Official Contact Email',
    labelKh: 'អ៊ីមែលផ្លូវការរបស់សាលា',
    description: 'Administrative email address printed on invoices and outgoing notifications',
    descriptionKh: 'អ៊ីមែលរដ្ឋបាលសម្រាប់បោះពុម្ពលើវិក្កយបត្រ និងការផ្ញើដំណឹង',
    type: 'string',
    defaultValue: 'contact@snp.edu.kh',
    placeholder: 'admin@snp.edu.kh',
  },
  {
    key: 'SCHOOL_PHONE',
    label: 'Official Contact Phone',
    labelKh: 'លេខទូរស័ព្ទទំនាក់ទំនងទូទៅ',
    description: 'Campus reception hotline phone number',
    descriptionKh: 'លេខទូរស័ព្ទខ្សែបន្ទាន់ទទួលភ្ញៀវរបស់សាលា',
    type: 'string',
    defaultValue: '+855 23 888 999',
    placeholder: '+855 23 888 999',
  },
  {
    key: 'SCHOOL_ADDRESS',
    label: 'Headquarters Address',
    labelKh: 'អាសយដ្ឋានទីស្នាក់ការ',
    description: 'Physical campus address printed on official headers and transcripts',
    descriptionKh: 'អាសយដ្ឋានទីតាំងសាលាសម្រាប់បោះពុម្ពលើក្បាលលិខិតផ្លូវការ',
    type: 'string',
    defaultValue: 'Phnom Penh, Cambodia',
    placeholder: 'No. 123, Street 271, Phnom Penh',
  },
  {
    key: 'SYSTEM_TIMEZONE',
    label: 'Institutional Timezone',
    labelKh: 'តំបន់ម៉ោងប្រព័ន្ធ',
    description: 'Default timezone for audit timestamping, session scheduling, and daily rollups',
    descriptionKh: 'តំបន់ម៉ោងស្តង់ដារសម្រាប់កាលវិភាគ និងការកត់ត្រាប្រវត្តិប្រព័ន្ធ',
    type: 'string',
    defaultValue: 'Asia/Phnom_Penh',
    options: [
      {
        value: 'Asia/Phnom_Penh',
        label: 'Asia/Phnom_Penh (UTC+7)',
        labelKh: 'អាស៊ី/ភ្នំពេញ (UTC+7)',
      },
      {
        value: 'Asia/Bangkok',
        label: 'Asia/Bangkok (UTC+7)',
        labelKh: 'អាស៊ី/បាងកក (UTC+7)',
      },
      {
        value: 'Asia/Singapore',
        label: 'Asia/Singapore (UTC+8)',
        labelKh: 'អាស៊ី/សិង្ហបុរី (UTC+8)',
      },
      {
        value: 'UTC',
        label: 'UTC (Coordinated Universal Time)',
        labelKh: 'UTC (ម៉ោងសកល)',
      },
    ],
  },
];

export const SettingPanelGeneral = () => {
  return (
    <SettingsDomainPanel
      title="School Identity & General Profile"
      titleKh="ព័ត៌មានទូទៅ & អត្តសញ្ញាណសាលា"
      description="Configure core institutional branding, contact endpoints, and regional timezone policies"
      descriptionKh="កំណត់អត្តសញ្ញាណសាលារៀន ព័ត៌មានទំនាក់ទំនងរដ្ឋបាល និងតំបន់ម៉ោងប្រព័ន្ធ"
      category="general"
      fields={generalFields}
    />
  );
};
