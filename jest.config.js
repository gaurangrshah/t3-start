const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');
const nextJest = require('next/jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '@/(.*)': '<rootDir>/src/$1',
  },
  // modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>/src/',
  // }),
  testEnvironment: 'jest-environment-jsdom',
  resetMocks: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
