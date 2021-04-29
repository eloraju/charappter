import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    transform: {
        '\\.ts$': 'ts-jest'
    },
    testRegex: '(/tests/.*\\.test)\\.ts$',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/coverage/',
        '.*/config.ts'
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        '**/src/**/*.{ts,js}',
        '!**/node_modules/**',
        '!**/build/**',
        '!**/coverage/**'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    coverageReporters: ['text-summary', 'html', 'json'],
    preset: '@shelf/jest-mongodb'
};

export default config;
