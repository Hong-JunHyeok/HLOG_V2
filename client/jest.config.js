module.exports = {  
  moduleNameMapper: {    
    '@/(.*)$': '<rootDir>/src/$1',  
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],
};
