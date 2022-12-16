import { Slide } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';
import {
  useScrollDirection,
  type DirectionEnum,
} from './hooks/use-scroll-direction';

type AllPositionFromEnum = 'top' | 'bottom' | 'left' | 'right';

type ScrollSlideProps = {
  children: ReactNode;
  dir: DirectionEnum;
  from: AllPositionFromEnum;
};

export const ScrollSlide: FC<ScrollSlideProps> = ({
  dir = 'up',
  from = 'top',
  children,
}) => {
  const scrollDirection: DirectionEnum = useScrollDirection();
  return (
    <Slide direction={from} in={scrollDirection !== dir}>
      {children}
    </Slide>
  );
};
