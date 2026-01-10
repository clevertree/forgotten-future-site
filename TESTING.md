# Component Testing Guide

This project includes comprehensive component testing using Cypress and Storybook documentation.

## Storybook Stories

Interactive component documentation and visual testing with Storybook.

### Running Storybook

```bash
npm run storybook
```

This starts Storybook on http://localhost:6006

### Story Files

All story files are named with `.stories.tsx` suffix:

- `app/components/Navigation.stories.tsx` - Navigation component in desktop and mobile views
- `app/components/Feedback/CommentAnchor.stories.tsx` - Comment trigger button with active/inactive states
- `app/components/Feedback/CommentPopup.stories.tsx` - Comment submission form
- `app/components/Feedback/SuccessPopup.stories.tsx` - Success confirmation popup

## Cypress Component Tests

Automated component testing with Cypress for interactive behavior and state changes.

### Running Tests

```bash
# Run tests in headless mode
npm run test

# Open interactive test runner
npm run test:watch

# Run in headless mode with output
npm run test:headless
```

### Test Files

All test files are named with `.cy.tsx` suffix:

- `app/components/Feedback/CommentAnchor.cy.tsx` - Tests hover states and callback triggers
- `app/components/Feedback/SuccessPopup.cy.tsx` - Tests success message display and link handling

### API Mocking

The tests mock the comment submission API using Cypress intercept:

```typescript
cy.intercept('POST', '/api/comments/submit', {
  statusCode: 200,
  body: {
    prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/123',
    message: 'Comment submitted successfully',
  },
}).as('submitComment');
```

Mock response is configured in `cypress/support/component.ts` and automatically applied to all tests.

## Pre-commit Hook

The pre-commit hook automatically:
1. Runs `npm run build` - validates that code compiles
2. Runs `npm run test:headless` - executes component tests (non-blocking - failures don't prevent commits)

This ensures code quality without blocking developer workflows.

### Bypassing Pre-commit Hook

If you need to skip the checks (not recommended):

```bash
git commit --no-verify
```

## Test Configuration

- **Cypress Config**: `cypress.config.ts`
  - Configured for Next.js framework
  - Supports TypeScript components
  - Test spec pattern: `app/**/*.cy.tsx`

- **Storybook Config**: `.storybook/main.ts` and `.storybook/preview.ts`
  - Story pattern: `app/**/*.stories.tsx`
  - Includes addon-essentials and addon-interactions

- **TypeScript Config**: `tsconfig.json`
  - Test files (`.cy.tsx`, `.stories.tsx`) excluded from Next.js build
  - Storybook and Cypress directories excluded from build

## Writing New Tests

### Adding a Cypress Test

```typescript
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    cy.mount(<YourComponent prop="value" />);
    cy.contains('expected text').should('be.visible');
  });

  it('should handle user interaction', () => {
    cy.mount(<YourComponent onAction={cy.stub().as('action')} />);
    cy.contains('button').click();
    cy.get('@action').should('have.been.called');
  });
});
```

### Adding a Storybook Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop: 'value',
  },
};
```

## API Mocking Strategy

For the comment submission feature:

1. **Mock responses** are defined in `cypress/support/component.ts`
2. **No real API calls** are made during tests - all requests are intercepted
3. **Mock data** includes realistic GitHub PR URLs and success messages
4. **Error cases** can be tested by intercepting with error responses

This allows tests to run independently without backend dependencies.

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```bash
# In your CI script
npm install --legacy-peer-deps
npm run build  # Must succeed
npm run test:headless  # Optional but recommended
```

The pre-commit hook ensures local quality gates before code reaches CI.
