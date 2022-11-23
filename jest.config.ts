import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
}

export default jestConfig