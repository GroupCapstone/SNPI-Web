import React from 'react';

export default {
  logo: (
    <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.1rem' }}>
      SNPI-SMS <span style={{ color: '#0056FF', fontWeight: 600 }}>DOCS</span>
    </span>
  ),
  project: {
    link: 'https://github.com/Tan-Saphea/SNPI-SMS',
  },
  docsRepositoryBase: 'https://github.com/Tan-Saphea/SNPI-SMS/tree/main/snp-sms-docs',
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} © SNPI School Management System. Official Developer
        Documentation.
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  darkMode: true,
  search: {
    placeholder: 'Search documentation...',
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
};
