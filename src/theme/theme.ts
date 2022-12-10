import {
  extendTheme,
  theme as baseTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import * as components from './components';
import * as foundations from './foundations';

export const theme: ThemeConfig = extendTheme({
  ...baseTheme,
  ...foundations,
  components: { ...components },
  colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
});
