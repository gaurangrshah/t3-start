// @NOTE: we don't seem to need global.fetch since we've given trpc wrapper its own implementation
// import fetch from 'cross-fetch';
// globalThis.fetch = fetch;

export * from '@/__tests__/fixtures';
export { default as userEvent } from '@testing-library/user-event';
export * from './render';
export * from './wrapper';
