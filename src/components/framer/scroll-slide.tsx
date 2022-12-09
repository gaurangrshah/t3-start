import { Slide } from '@chakra-ui/react';
import {
  useScrollDirection,
  type DirectionEnum,
} from './hooks/use-scroll-direction';

type AllPositionFromEnum = 'top' | 'bottom' | 'left' | 'right';

type ScrollSlideProps = {
  children: React.ReactNode;
  dir: DirectionEnum;
  from: AllPositionFromEnum;
};

export const ScrollSlide: React.FC<ScrollSlideProps> = ({
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
