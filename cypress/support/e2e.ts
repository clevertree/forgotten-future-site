import '@cypress/react';
import '@testing-library/cypress/add-commands';

// Mock API responses globally
beforeEach(() => {
  cy.intercept('POST', '/api/comments/submit', {
    statusCode: 200,
    body: {
      prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/123',
      message: 'Comment submitted successfully',
    },
  }).as('submitComment');
});

// Custom command to mock comment API
Cypress.Commands.add('mockCommentApi', () => {
  cy.intercept('POST', '/api/comments/submit', {
    statusCode: 200,
    body: {
      prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/123',
    },
  }).as('submitComment');
});

declare global {
  namespace Cypress {
    interface Chainable {
      mockCommentApi(): Chainable;
    }
  }
}
