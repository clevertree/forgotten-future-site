
import ManuscriptPage from '../page';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

describe('ManuscriptPage Component', () => {
  const getMockRouter = () => ({
    back: cy.stub(),
    forward: cy.stub(),
    refresh: cy.stub(),
    push: cy.stub(),
    replace: cy.stub(),
    prefetch: cy.stub(),
  });

  it('should load chapters from live GitHub source', () => {
    // We mount the component which will now use fetchManuscript helper
    cy.mount(
      <AppRouterContext.Provider value={getMockRouter() as any}>
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          <ManuscriptPage />
        </SearchParamsContext.Provider>
      </AppRouterContext.Provider>
    );

    // Check if the page title is correct
    cy.get('h1').should('contain', "Manuscript: Ren's Memories");

    // Wait for live data to load - Chapter 1 should eventually appear
    cy.contains('Outpost', { timeout: 15000 }).should('be.visible');

    // Verify that we have multiple chapter boxes
    cy.get('.glass-panel').should('have.length.at.least', 5);

    // Verify a dynamic synopsis from the "Concept" field exists
    // (We know Chapter 1 has a concept field in ff-story)
    cy.get('.glass-panel').first().find('p').should('not.be.empty');
  });

  it('should filter chapters by section', () => {
    cy.viewport(1280, 720); // Ensure desktop view for button clicks
    cy.mount(
      <AppRouterContext.Provider value={getMockRouter() as any}>
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          <ManuscriptPage />
        </SearchParamsContext.Provider>
      </AppRouterContext.Provider>
    );

    // Click Part II using the button in the desktop nav
    cy.get('button').contains('Part II:').click();

    // Verify it scroll/shows relevant content (basic check)
    cy.contains('Cradle Zero').should('be.visible');
  });
});
