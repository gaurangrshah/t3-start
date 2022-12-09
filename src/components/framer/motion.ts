/* eslint-disable object-curly-newline */
import type {
  BoxProps,
  ContainerProps,
  FlexProps,
  SquareProps,
} from '@chakra-ui/react';
import { Box, Container, Flex, Square } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const MotionContainer = motion<ContainerProps>(Container);
export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionSquare = motion<SquareProps>(Square);
