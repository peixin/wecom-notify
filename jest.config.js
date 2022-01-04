const config = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "/tests/.*\\.spec\\.ts$",
  moduleFileExtensions: ["js", "json", "ts", "json"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  coverageReporters: ["lcov", "text-summary", "json-summary"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};

module.exports = config;
