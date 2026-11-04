'use client';

import * as React from 'react';
import type { DomainFieldDefinition } from './settings-domain-panel';
import { SettingsDomainPanel } from './settings-domain-panel';

const financeFields: DomainFieldDefinition[] = [
  {
    key: 'DEFAULT_CURRENCY',
    label: 'Primary Accounting Currency',
    labelKh: 'រូបិយប័ណ្ណគណនេយ្យចម្បង',
    description:
      'Default currency unit for tuition structures, fee invoicing, and financial statements',
    descriptionKh: 'រូបិយប័ណ្ណស្តង់ដារសម្រាប់រចនាសម្ព័ន្ធថ្លៃសិក្សា វិក្កយបត្រ និងរបាយការណ៍',
    type: 'string',
    defaultValue: 'USD',
    options: [
      {
        value: 'USD',
        label: 'USD ($) - United States Dollar',
        labelKh: 'ដុល្លារអាមេរិក ($ - USD)',
      },
      {
        value: 'KHR',
        label: 'KHR (៛) - Cambodian Riel',
        labelKh: 'ប្រាក់រៀលខ្មែរ (៛ - KHR)',
      },
    ],
  },
  {
    key: 'EXCHANGE_RATE_USD_KHR',
    label: 'Exchange Rate (1 USD to KHR)',
    labelKh: 'អត្រាប្តូរប្រាក់ (១ ដុល្លារ ជា រៀល)',
    description: 'System exchange rate applied when converting between USD and KHR ledgers',
    descriptionKh: 'អត្រាប្តូរប្រាក់ផ្លូវការសម្រាប់បម្លែងរវាងប្រាក់ដុល្លារ និងប្រាក់រៀល',
    type: 'number',
    defaultValue: 4100,
    placeholder: '4100',
  },
  {
    key: 'PAYMENT_GRACE_PERIOD_DAYS',
    label: 'Tuition Payment Grace Period (Days)',
    labelKh: 'រយៈពេលអនុគ្រោះបង់ថ្លៃសិក្សា (ថ្ងៃ)',
    description:
      'Number of calendar days after invoice due date before accounts flag as delinquent',
    descriptionKh: 'ចំនួនថ្ងៃអនុគ្រោះបន្ទាប់ពីថ្ងៃផុតកំណត់ មុនពេលគិតថាជំពាក់យឺតយ៉ាវ',
    type: 'number',
    defaultValue: 15,
    placeholder: '15',
  },
  {
    key: 'LATE_PAYMENT_FEE_PERCENT',
    label: 'Late Payment Penalty Rate (%)',
    labelKh: 'ភាគរយពិន័យបង់យឺត (%)',
    description: 'Percentage fee penalty applied to overdue balances past the grace period',
    descriptionKh: 'ភាគរយប្រាក់ពិន័យបន្ថែមលើប្រាក់ជំពាក់ហួសកាលកំណត់',
    type: 'number',
    defaultValue: 5,
    placeholder: '5',
  },
];

export const SettingPanelFinance = () => {
  return (
    <SettingsDomainPanel
      title="Finance & Currency Defaults"
      titleKh="ហិរញ្ញវត្ថុ & រូបិយប័ណ្ណ"
      description="Manage accounting currency, exchange conversion rate, and tuition payment grace periods"
      descriptionKh="គ្រប់គ្រងរូបិយប័ណ្ណ អត្រាប្តូរប្រាក់ផ្លូវការ រយៈពេលអនុគ្រោះ និងការពិន័យបង់យឺត"
      category="finance"
      fields={financeFields}
    />
  );
};
