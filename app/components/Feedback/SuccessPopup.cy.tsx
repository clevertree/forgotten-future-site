import { SuccessPopup } from './SuccessPopup';

describe('SuccessPopup Component', () => {
  beforeEach(() => {
    cy.mount(
      <SuccessPopup
        prUrl="https://github.com/clevertree/forgotten-future-site/pull/123"
        onClose={cy.stub().as('onClose')}
      />
    );
  });

  it('should render success message', () => {
    cy.contains('Contribution Submitted!').should('be.visible');
  });

  it('should display PR link', () => {
    cy.contains('View Pull Request')
      .should('have.attr', 'href', 'https://github.com/clevertree/forgotten-future-site/pull/123')
      .should('have.attr', 'target', '_blank');
  });

  it('should call onClose when close button clicked', () => {
    cy.contains('button', 'Close').click();
    cy.get('@onClose').should('have.been.called');
  });

  it('should show feedback confirmation text', () => {
    cy.contains('Your feedback has been packaged into a Pull Request').should('be.visible');
  });
});
