import { Box, Tooltip } from '@chakra-ui/react';

import type { ChakraProps } from '@chakra-ui/react';
import type { FC } from 'react';

import { paths } from './paths';

type ToolIconProps = {
  color: string;
  icon: string;
  size: string;
  tipLabel?: string | null;
};

const CustomToolIcon: FC<ToolIconProps & ChakraProps> = ({
  color,
  icon,
  size,
  ...rest
}) => (
  <Box
    as="svg"
    viewBox={paths[icon]?.viewBox}
    width={size}
    height={size}
    fill={color}
    {...rest}
  >
    {paths[icon]?.d.map((d: string, i: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <path key={i} d={d} />
    ))}
  </Box>
);

export function ToolIcon({
  icon = 'add',
  color = 'inherit',
  size = '1.25em',
  tipLabel = null,
  ...rest
}: ToolIconProps & ChakraProps) {
  return tipLabel ? (
    <Tooltip label={tipLabel} aria-label={tipLabel}>
      <Box
        as="span"
        tabIndex={0}
        /* span is required by chakra as a wrapper on icons when using tooltips */
        // @link https://chakra-ui.com/docs/overlay/tooltip
      >
        <CustomToolIcon
          icon={icon}
          size={size}
          tipLabel={tipLabel}
          color={color}
          {...rest}
        />
      </Box>
    </Tooltip>
  ) : (
    <CustomToolIcon icon={icon} size={size} color={color} {...rest} />
  );
}
