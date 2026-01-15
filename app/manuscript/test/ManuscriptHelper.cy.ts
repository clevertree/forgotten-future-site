
import { fetchManuscript } from '../../../lib/manuscript';

describe('Manuscript Helper (lib/manuscript.ts)', () => {
  it('should fetch and parse the live manuscript from GitHub', () => {
    // Increase timeout for live network call
    cy.wrap(fetchManuscript(), { timeout: 15000 }).then((data) => {
      expect(data).to.have.property('parts').and.be.an('array');
      expect(data).to.have.property('chapters').and.be.an('array');

      const { chapters } = data;
      expect(chapters.length).to.be.greaterThan(0);

      const firstChapter = chapters[0];
      expect(firstChapter).to.have.property('id', 1);
      expect(firstChapter).to.have.property('title').and.not.be.empty;
      expect(firstChapter).to.have.property('content').and.not.be.empty;
      expect(firstChapter).to.have.property('summary').and.not.be.empty;

      // Check for common narrative markers
      expect(firstChapter.title).to.include('Arrival of Lynn');
      expect(firstChapter.content).to.include('Lem');
    });
  });
});
