import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@product/(.*)$': '<rootDir>/src/product/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
};

export default config;
