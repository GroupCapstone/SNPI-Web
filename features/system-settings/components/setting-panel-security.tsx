'use client';

import * as React from 'react';
import type { DomainFieldDefinition } from './settings-domain-panel';
import { SettingsDomainPanel } from './settings-domain-panel';

const securityFields: DomainFieldDefinition[] = [
  {
    key: 'SESSION_TIMEOUT_MINUTES',
    label: 'Session Access Token Lifespan (Minutes)',
    labelKh: 'អាយុកាលសម័យប្រជុំ Access Token (នាទី)',
    description:
      'Active access token duration before silent rotation or re-authentication is required',
    descriptionKh: 'រយៈពេលសុពលភាពនៃ Token មុនពេលតម្រូវឱ្យ Refresh ឬ Login ម្តងទៀត',
    type: 'number',
    defaultValue: 15,
    options: [
      {
        value: 15,
        label: '15 minutes (Strict Security)',
        labelKh: '១៥ នាទី (សុវត្ថិភាពតឹងរ៉ឹង)',
      },
      { value: 30, label: '30 minutes (Balanced)', labelKh: '៣០ នាទី (មធ្យម)' },
      {
        value: 60,
        label: '60 minutes (Standard Staff)',
        labelKh: '៦០ នាទី (ស្តង់ដារបុគ្គលិក)',
      },
      {
        value: 120,
        label: '120 minutes (Extended)',
        labelKh: '១២០ នាទី (ពន្យារពេល)',
      },
    ],
  },
  {
    key: 'MAX_LOGIN_ATTEMPTS',
    label: 'Maximum Failed Login Attempts',
    labelKh: 'ចំនួនដងវាយពាក្យសម្ងាត់ខុសអតិបរមា',
    description:
      'Number of consecutive invalid credential attempts before account triggers protective lock',
    descriptionKh: 'ចំនួនដងអនុញ្ញាតឱ្យវាយពាក្យសម្ងាត់ខុសជាប់ៗគ្នា មុនពេលចាក់សោសុវត្ថិភាព',
    type: 'number',
    defaultValue: 5,
    options: [
      {
        value: 3,
        label: '3 attempts (High Sensitivity)',
        labelKh: '៣ ដង (កម្រិតប្រុងប្រយ័ត្នខ្ពស់)',
      },
      {
        value: 5,
        label: '5 attempts (Recommended Standard)',
        labelKh: '៥ ដង (កម្រិតស្តង់ដារណែនាំ)',
      },
      { value: 10, label: '10 attempts (Lenient)', labelKh: '១០ ដង (កម្រិតធូររលុង)' },
    ],
  },
  {
    key: 'ACCOUNT_LOCKOUT_MINUTES',
    label: 'Account Lockout Duration (Minutes)',
    labelKh: 'រយៈពេលចាក់សោគណនី (នាទី)',
    description: 'Cool-down duration before an auto-locked account may re-attempt login',
    descriptionKh: 'រយៈពេលរង់ចាំមុនពេលគណនីដែលជាប់សោអាចព្យាយាមចូលប្រព័ន្ធម្តងទៀត',
    type: 'number',
    defaultValue: 30,
    placeholder: '30',
  },
  {
    key: 'PASSWORD_REQUIRE_SPECIAL_CHAR',
    label: 'Enforce Special Character Complexity',
    labelKh: 'តម្រូវឱ្យមានសញ្ញាពិសេសក្នុងពាក្យសម្ងាត់',
    description: 'Require passwords to contain symbols and special characters',
    descriptionKh: 'តម្រូវឱ្យពាក្យសម្ងាត់ថ្មីត្រូវមានសញ្ញាពិសេស និងនិមិត្តសញ្ញា',
    type: 'boolean',
    defaultValue: true,
  },
];

export const SettingPanelSecurity = () => {
  return (
    <SettingsDomainPanel
      title="Security & Authentication Governance"
      titleKh="សុវត្ថិភាព & សម័យប្រជុំ"
      description="Enforce session lifetimes, brute-force mitigation thresholds, and password complexity standards"
      descriptionKh="គ្រប់គ្រងអាយុកាលសម័យប្រជុំ កម្រិតការពារការទាយពាក្យសម្ងាត់ និងបទដ្ឋានសុវត្ថិភាព"
      category="security"
      fields={securityFields}
    />
  );
};
