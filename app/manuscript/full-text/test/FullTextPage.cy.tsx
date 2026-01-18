
import FullTextManuscript from '../page';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

describe('FullTextManuscript Component', () => {
  const getMockRouter = () => ({
    back: cy.stub(),
    forward: cy.stub(),
    refresh: cy.stub(),
    push: cy.stub(),
    replace: cy.stub(),
    prefetch: cy.stub(),
  });

  it('should render the full manuscript sequentially from GitHub', () => {
    cy.mount(
      <AppRouterContext.Provider value={getMockRouter() as any}>
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          <FullTextManuscript />
        </SearchParamsContext.Provider>
      </AppRouterContext.Provider>
    );

    // Check main title
    cy.get('h1').should('contain', 'FORGOTTEN FUTURE');

    // Wait for live data to load - several chapters should appear
    cy.get('section[id^="chapter-"]', { timeout: 15000 }).should('have.length.at.least', 20);

    // Check that Chapter 1 has its header and some prose
    cy.get('#chapter-1').within(() => {
      cy.get('h3').should('contain', 'Outpost');
      cy.get('.prose').should('not.be.empty');
    });

    // Check navigation sidebar is populated
    cy.get('aside').within(() => {
      cy.get('ul').find('a').should('have.length.at.least', 20);
      cy.contains('1. Outpost').should('have.attr', 'href', '#chapter-1');
    });
  });

  it('should have sticky navigation sidebar', () => {
    cy.mount(
      <AppRouterContext.Provider value={getMockRouter() as any}>
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          <FullTextManuscript />
        </SearchParamsContext.Provider>
      </AppRouterContext.Provider>
    );
    cy.get('aside .glass-panel').should('have.class', 'sticky');
  });
});
