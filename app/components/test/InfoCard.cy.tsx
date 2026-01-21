import React from 'react';
import { InfoCard } from '../InfoCard';

describe('InfoCard Component', () => {
    it('renders title and description', () => {
        cy.mount(
            <InfoCard
                title="Test Title"
                description={<p>Test Description</p>}
                imageSrc="/test-image.png"
                imageAlt="Test Alt"
            />
        );
        cy.get('h3').should('contain', 'Test Title');
        cy.get('p').should('contain', 'Test Description');
        cy.get('img').should('have.attr', 'alt', 'Test Alt');
    });

    it('renders subtitle when provided', () => {
        cy.mount(
            <InfoCard
                title="Test Title"
                subtitle="Test Subtitle"
                description={<p>Test Description</p>}
                imageSrc="/test-image.png"
                imageAlt="Test Alt"
            />
        );
        cy.get('p').should('contain', 'Test Subtitle');
    });

    it('handles click events', () => {
        const onClick = cy.stub().as('onClick');
        cy.mount(
            <InfoCard
                title="Test Title"
                description={<p>Test Description</p>}
                imageSrc="/test-image.png"
                imageAlt="Test Alt"
                onClick={onClick}
            />
        );
        cy.get('.group').click();
        cy.get('@onClick').should('have.been.called');
    });

    it('applies horizontal layout', () => {
        cy.mount(
            <InfoCard
                title="Test Title"
                description={<p>Test Description</p>}
                imageSrc="/test-image.png"
                imageAlt="Test Alt"
                layout="horizontal"
            />
        );
        cy.get('.md\\:flex-row').should('exist');
    });
});
