'use client';

import * as React from 'react';
import type { DomainFieldDefinition } from './settings-domain-panel';
import { SettingsDomainPanel } from './settings-domain-panel';

const notificationFields: DomainFieldDefinition[] = [
  {
    key: 'NOTIFICATION_TELEGRAM_ENABLED',
    label: 'Enable Telegram Channel Broadcasts',
    labelKh: 'បើកដំណើរការការជូនដំណឹងតាម Telegram',
    description:
      'Dispatch operational task reminders and administrative alerts to school Telegram bot',
    descriptionKh: 'ផ្ញើសាររំលឹកកិច្ចការ និងដំណឹងរដ្ឋបាលទៅកាន់ Telegram Bot របស់សាលា',
    type: 'boolean',
    defaultValue: true,
  },
  {
    key: 'TELEGRAM_CHANNEL_ID',
    label: 'Telegram Channel or Group ID',
    labelKh: 'Telegram Channel ឬ Group ID',
    description:
      'Target public channel username or private chat group ID for administrative dispatch',
    descriptionKh: 'ឈ្មោះ Channel សាធារណៈ ឬ Chat ID សម្រាប់ទទួលសារជូនដំណឹង',
    type: 'string',
    defaultValue: '@snp_school_notifications',
    placeholder: '@snp_school_notifications',
  },
  {
    key: 'NOTIFICATION_SMS_ENABLED',
    label: 'Enable Guardian SMS Alerts',
    labelKh: 'បើកដំណើរការសារ SMS ទៅកាន់អាណាព្យាបាល',
    description: 'Enable automated SMS dispatch for urgent student absence and attendance alerts',
    descriptionKh: 'បើកការផ្ញើសារ SMS ស្វ័យប្រវត្តិក្នងករណីសិស្សអវត្តមានបន្ទាន់',
    type: 'boolean',
    defaultValue: false,
  },
  {
    key: 'PAYMENT_REMINDER_DAYS_BEFORE',
    label: 'Tuition Due Reminder Timing (Days Prior)',
    labelKh: 'ការរំលឹកមុនថ្ងៃបង់ថ្លៃសិក្សា (ថ្ងៃ)',
    description:
      'Days before tuition invoice due date when automated reminder alerts are dispatched',
    descriptionKh: 'ចំនួនថ្ងៃមុនកាលបរិច្ឆេទផុតកំណត់បង់ថ្លៃសិក្សា ដែលប្រព័ន្ធត្រូវផ្ញើសាររំលឹក',
    type: 'number',
    defaultValue: 3,
    placeholder: '3',
  },
];

export const SettingPanelNotification = () => {
  return (
    <SettingsDomainPanel
      title="Notification Channels & Automated Reminders"
      titleKh="បណ្តាញជូនដំណឹង & ការរំលឹក"
      description="Configure Telegram bots, guardian SMS gateway alerts, and automated billing notifications"
      descriptionKh="កំណត់ការតភ្ជាប់ Telegram Bot ប្រព័ន្ធផ្ញើសារ SMS និងការរំលឹកបង់ថ្លៃសិក្សាស្វ័យប្រវត្តិ"
      category="notification"
      fields={notificationFields}
    />
  );
};
