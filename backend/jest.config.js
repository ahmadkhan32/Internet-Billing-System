module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'utils/**/*.js',
    'models/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Backend Test Report',
      outputPath: './tests/reports/backend-report.html',
      includeFailureMsg: true,
      includeSuiteFailure: true
    }]
  ],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};

