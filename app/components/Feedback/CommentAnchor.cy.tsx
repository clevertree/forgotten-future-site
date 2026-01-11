/// <reference types="cypress" />
import { CommentAnchor } from './CommentAnchor';

describe('CommentAnchor Component', () => {
  beforeEach(() => {
    cy.mount(
      <CommentAnchor
        path="/manuscript/chapter_01.md"
        anchorId="scene-1"
        isActive={true}
        onOpenComment={cy.stub().as('openComment')}
      >
        <p>Hover me to add feedback</p>
      </CommentAnchor>
    );
  });

  it('should render children when active', () => {
    cy.contains('Hover me to add feedback').should('be.visible');
  });

  it('should show comment button on hover', () => {
    // Initial state: Hidden (opacity-0)
    cy.get('button[title="Add comment"]').parent().should('have.class', 'opacity-0');
    
    // Hover: Visible (opacity-100)
    cy.contains('Hover me to add feedback').parents('.group').trigger('mouseover');
    cy.get('button[title="Add comment"]').parent().should('have.class', 'group-hover:opacity-100');
  });

  it('should call onOpenComment when button clicked', () => {
    cy.contains('Hover me to add feedback').parent().trigger('mouseenter');
    cy.get('button[title="Add comment"]').click();
    cy.get('@openComment').should('have.been.called');
  });
});

describe('CommentAnchor Inactive', () => {
  it('should not show button when inactive', () => {
    cy.mount(
      <CommentAnchor
        path="/manuscript/chapter_01.md"
        anchorId="scene-1"
        isActive={false}
        onOpenComment={cy.stub()}
      >
        <p>Cannot comment</p>
      </CommentAnchor>
    );

    cy.contains('Cannot comment').should('be.visible');
    cy.get('button[title="Add comment"]').should('not.exist');
  });
});
