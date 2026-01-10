import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: ['app/**/*.cy.ts', 'app/**/*.cy.tsx'],
    supportFile: 'cypress/support/component.ts',
  },
});
