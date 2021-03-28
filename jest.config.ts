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
  preset: '@shelf/jest-mongodb'
};

export default config;
