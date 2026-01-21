import React from 'react';
import { Notification } from '../Notification';

describe('Notification Component', () => {
    it('renders message when provided', () => {
        cy.mount(
            <Notification
                message="Test Notification"
                onClose={() => {}}
            />
        );
        cy.get('div').should('contain', 'Test Notification');
    });

    it('renders nothing when message is null', () => {
        cy.mount(
            <Notification
                message={null}
                onClose={() => {}}
            />
        );

        cy.get('.bg-cyan-500').should('not.exist');
    });

    it('handles close click', () => {
        const onClose = cy.stub().as('onClose');
        cy.mount(
            <Notification
                message="Test"
                onClose={onClose}
            />
        );
        cy.get('button').click();
        cy.get('@onClose').should('have.been.called');
    });
});
