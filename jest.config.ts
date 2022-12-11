import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest',
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx)"],
  testPathIgnorePatterns: ["node_modules"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)?$": "@swc/jest",
  },
}

export default jestConfig