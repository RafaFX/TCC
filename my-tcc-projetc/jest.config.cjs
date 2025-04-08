// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Usar babel-jest para transformar arquivos JSX/JS
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Corrigido: não precisa de 'extend-expect'
  testEnvironment: 'jest-environment-jsdom', // Ambiente de testes simula o DOM
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Lidar com imports de CSS
  },
};
