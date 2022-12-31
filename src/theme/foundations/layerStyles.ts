import { useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

const layerStyles = {
  'flex-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    py: { base: '0', sm: '8' },
    px: { base: '4', sm: '10' },
    bg: { base: 'transparent', sm: 'bg-surface' },
    boxShadow: { base: 'none', sm: 'md' },
    borderRadius: { base: 'none', sm: 'xl' },
  },
};

export default layerStyles;
