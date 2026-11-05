import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const directory = path.dirname(fileURLToPath(import.meta.url));

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile(path.resolve(directory, '.env.local'));
  } catch {
    try {
      process.loadEnvFile(path.resolve(directory, '.env'));
    } catch {
      // Ignore if missing
    }
  }
}

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@snp\/shared\/(.*)$/, replacement: `${path.resolve(directory, './contracts')}/$1` },
      { find: '@snp/shared', replacement: path.resolve(directory, './contracts/index.ts') },
      { find: '@', replacement: directory },
    ],
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.ts'],
  },
});
