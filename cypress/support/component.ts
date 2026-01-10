import '@testing-library/cypress/add-commands';

// Mock the API responses for comments
Cypress.Commands.add('mockCommentApi', () => {
  cy.intercept('POST', '/api/comments/submit', {
    statusCode: 200,
    body: {
      prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/1',
      message: 'Comment submitted successfully',
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
