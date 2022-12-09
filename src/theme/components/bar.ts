const baseStyle = {
  position: 'fixed',
  w: 'full',
  px: 8,
  py: 14,
  mt: { base: 32, xl: 0 },
  maxH: 20,
  background: 'brand.400',
  zIndex: 'docked',
  border: '1px solid',
};

const variants = {
  thin: {
    maxH: 12,
    py: 8,
  }
}

export const Bar = { baseStyle, variants };
