/**
 * Mock API utilities for component testing
 * Provides consistent mock responses for API calls in tests
 */

export const mockCommentSubmitResponse = {
  success: true,
  prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/123',
  message: 'Comment submitted successfully',
};

export const mockCommentSubmitError = {
  success: false,
  message: 'Failed to submit comment',
};

/**
 * Mock fetch for comment submission API
 */
export const mockCommentAPI = (response: any = mockCommentSubmitResponse) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: response.success !== false,
      json: () => Promise.resolve(response),
      status: response.success !== false ? 200 : 400,
    })
  ) as jest.Mock;
};

/**
 * Restore original fetch
 */
export const restoreCommentAPI = () => {
  jest.restoreAllMocks();
};
