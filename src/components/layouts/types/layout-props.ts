import type { ReactNode } from 'react';

export type LayoutProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
};
