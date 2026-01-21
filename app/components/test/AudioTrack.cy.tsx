import React from 'react';
import { AudioTrack } from '../AudioTrack';

describe('AudioTrack Component', () => {
    it('renders track info and audio element', () => {
        cy.mount(
            <AudioTrack
                title="Test Track"
                description="Test Description"
                path="/test.mp3"
                artist="Test Artist"
            />
        );
        cy.get('h3').should('contain', 'Test Track');
        cy.get('p').should('contain', 'Test Description');
        cy.get('a').should('contain', 'Artist: Test Artist');
        cy.get('audio').should('exist');
        cy.get('source').should('have.attr', 'src').and('include', '/test.mp3');
    });
});
