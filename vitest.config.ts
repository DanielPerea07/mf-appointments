import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/styles/**',
        'src/**/*.d.ts',
        'src/api/**',
        'src/i18n/**',
        'src/main.tsx',
      ],
      thresholds: { lines: 80, statements: 80, functions: 80, branches: 75 }
    }
  }
});
