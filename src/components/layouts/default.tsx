import React from 'react';
import { NextSeo } from 'next-seo';
import { Bar } from '@/components';
import { AvatarMenu } from '@/components/avatar-menu';
import { SEOConfig } from '@/utils';
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav';
import { chakra } from '@chakra-ui/react';
import type { LayoutProps } from './types';

export const DefaultLayout = ({
  title = 'My Site',
  subtitle = ' | This is what we do',
  description = 'And this is how we do it',
  children,
}: LayoutProps) => {
  return (
    <>
      <AvatarMenu />
      <NextSeo {...SEOConfig()} />
      <SkipNavLink zIndex="dropdown">Skip to content</SkipNavLink>
      <Bar as="header" />
      <chakra.div
        as="main"
        layerStyle="flex-center"
        minH="100vh"
        bgGradient="linear(to-b, #2e026d, #15162c)"
      >
        {children}
      </chakra.div>
    </>
  );
};
