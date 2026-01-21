import React from 'react';
import { ChapterCard } from '../ChapterCard';

describe('ChapterCard Component', () => {
    const mockChapter = {
        id: 1,
        title: 'Chapter One',
        timestamp: '15 AT',
        content: 'This is the first chapter content.\nWith a new line.'
    };

    it('renders chapter info and content', () => {
        cy.mount(
            <ChapterCard
                chapter={mockChapter}
                isSpeaking={false}
                onToggleSpeech={() => {}}
            />
        );

        cy.get('h3').should('contain', 'Chapter One');
        cy.get('div').should('contain', '15 AT');
        cy.get('p').should('have.length', 2);
    });

    it('calls onToggleSpeech when listener button is clicked', () => {
        const onToggleSpeech = cy.stub().as('onToggleSpeech');
        cy.mount(
            <ChapterCard
                chapter={mockChapter}
                isSpeaking={false}
                onToggleSpeech={onToggleSpeech}
            />
        );

        cy.get('button').contains('Listen').click();
        cy.get('@onToggleSpeech').should('have.been.calledWith', 1, mockChapter.content);
    });

    it('shows stop button when speaking', () => {
        cy.mount(
            <ChapterCard
                chapter={mockChapter}
                isSpeaking={true}
                onToggleSpeech={() => {}}
            />
        );

        cy.get('button').should('contain', 'Stop');
    });
});
