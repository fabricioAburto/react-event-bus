module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@test-utils(.*)$': '<rootDir>/test-utils/$1',
    '^@react-event-bus(.*)$': '<rootDir>/dist/$1',
  },
};
