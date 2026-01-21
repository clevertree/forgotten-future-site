import React from 'react';
import { FAQItem } from '../FAQItem';

describe('FAQItem Component', () => {
    it('renders question and answer for project category', () => {
        cy.mount(
            <FAQItem
                question="What is this?"
                answer="This is a test answer."
                category="project"
            />
        );
        cy.get('h3').should('contain', 'What is this?');
        cy.get('div').should('contain', 'This is a test answer.');
        cy.get('.border-l-cyan-900\\/50').should('exist');
    });

    it('renders with story category formatting', () => {
        cy.mount(
            <FAQItem
                question="Who are you?"
                answer="I am a test."
                category="story"
            />
        );
        cy.get('h3').should('contain', 'Q: Who are you?');
        cy.get('div').should('contain', 'A: I am a test.');
        cy.get('.border-l-red-900\\/50').should('exist');
    });

    it('renders with ethics category formatting', () => {
        cy.mount(
            <FAQItem
                question="Is it ethical?"
                answer="Yes."
                category="ethics"
            />
        );
        cy.get('.border-l-purple-900\\/50').should('exist');
    });
});
