import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/react');
export const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;
