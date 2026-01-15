
import FullTextManuscript from '../page';

describe('FullTextManuscript Component', () => {
  it('should render the full manuscript sequentially from GitHub', () => {
    cy.mount(<FullTextManuscript />);

    // Check main title
    cy.get('h1').should('contain', 'FORGOTTEN FUTURE');

    // Wait for live data to load - several chapters should appear
    cy.get('section[id^="chapter-"]', { timeout: 15000 }).should('have.length.at.least', 20);

    // Check that Chapter 1 has its header and some prose
    cy.get('#chapter-1').within(() => {
      cy.get('h3').should('contain', 'The Arrival of Lynn');
      cy.get('.prose').should('not.be.empty');
    });

    // Check navigation sidebar is populated
    cy.get('aside').within(() => {
      cy.get('ul').find('a').should('have.length.at.least', 20);
      cy.contains('1. The Arrival of Lynn').should('have.attr', 'href', '#chapter-1');
    });
  });

  it('should have sticky navigation sidebar', () => {
    cy.mount(<FullTextManuscript />);
    cy.get('aside .glass-panel').should('have.class', 'sticky');
  });
});
