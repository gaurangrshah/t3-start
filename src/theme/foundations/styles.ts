import { mode, type StyleFunctionProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: StyleFunctionProps) => ({
    '*': {
      border: 0,
      margin: 0,
      padding: 0,
      fontFeatureSettings: 'kern',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
    '*, *::before, *::after': {
      borderColor: 'rootBorder',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
    },
    body: {
      color: 'default',
      bg: 'bg-canvas',
      position: 'relative',
      fontFamily: 'body',
      fontSize: '1.5rem',
      lineHeight: 2,
      textRendering: 'optimizeLegibility',
      WebkitTextSizeAdjust: 'none',
      MozFontSmoothing: 'grayscale',
      overflowX: 'auto',
      maxW: 'full',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'gray.700')(props),
    },
    'html,body': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      scrollBehavior: 'smooth',
      // using % here allows users to override default size in browser settings??
      fontSize: '100%', // == 16px
      fontFamily: 'default',
      height: '100%',
    },
    '#__next, #root': {
      display: 'flex',
      flexDirection: 'column',
      minH: '100%',
    },
    '*::placeholder': {
      opacity: 1,
      color: 'placeholder',
    },
    'input:focus': {
      border: 'inherit',
    },
    'input:focus:invalid': {
      background: 'rgba(255, 224, 224, 1)',
    },
    'input:focus, input:focus:valid': {
      background: 'rgba(226, 250, 219, 1)',
    },
    'a:active, a:focus, a:visited': {
      outline: 0,
      border: 'none',
      outlineStyle: 'none',
      textDecoration: 'none',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0) !important',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    a: {
      textDecoration: 'none',
      color: 'link',
    },
    h1: {
      textStyle: 'h1',
    },
    h2: {
      textStyle: 'h2',
    },
    h3: {
      textStyle: 'h3',
    },
    h4: {
      textStyle: 'h4',
    },
    p: {
      textStyle: 'body',
    },
    small: {
      textStyle: 'tiny',
    },
    ol: {
      listStyleType: 'none',
    },
    ul: {
      listStyleType: 'none',
    },
  }),
};


export default styles;
