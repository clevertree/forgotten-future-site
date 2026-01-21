import React from 'react';
import { VesselCard } from '../VesselCard';

describe('VesselCard Component', () => {
    it('renders name, element and description', () => {
        cy.mount(
            <VesselCard
                name="Test Vessel"
                element="Test Element"
                description="Test Description"
            />
        );
        cy.get('h3').should('contain', 'Test Vessel');
        cy.get('span').should('contain', 'Test Element');
        cy.get('p').should('contain', 'Test Description');
    });
});
