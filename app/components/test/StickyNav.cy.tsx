import React from 'react';
import { StickyNav } from '../StickyNav';

describe('StickyNav Component', () => {
    const sections = [
        { id: 'sec1', title: 'Section 1' },
        { id: 'sec2', title: 'Section 2' }
    ];

    it('renders all sections', () => {
        cy.mount(<StickyNav sections={sections} />);
        cy.get('button').should('have.length', 2);
        cy.get('button').eq(0).should('contain', 'Section 1');
        cy.get('button').eq(1).should('contain', 'Section 2');
    });

    it('marks active section', () => {
        cy.mount(<StickyNav sections={sections} activeId="sec1" />);
        cy.get('button').eq(0).should('have.class', 'border-cyan-500');
    });

    it('handles click events', () => {
        const onSectionClick = cy.stub().as('onSectionClick');
        cy.mount(<StickyNav sections={sections} onSectionClick={onSectionClick} />);
        cy.get('button').eq(1).click();
        cy.get('@onSectionClick').should('have.been.calledWith', 'sec2');
    });
});
