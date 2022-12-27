import {
  Drawer as ChDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';

import type { DrawerProps } from '@chakra-ui/react';
import type { ElementType } from 'react';

type CustomDrawerProps = {
  Footer?: ElementType; // throws an error with ReactNode
  Header?: ElementType; // throws an error with ReactNode
  type?: 'default' | 'consent';
} & DrawerProps;

export const Drawer = ({
  isOpen,
  onClose,
  Header,
  Footer,
  children,
  size = 'lg',
  placement = 'left',
  type = 'default',
  ...props
}: CustomDrawerProps) => {
  const btnRef = useRef<HTMLInputElement>(null);
  return (
    <ChDrawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={btnRef}
      size={size}
      preserveScrollBarGap
      {...props}
    >
      <DrawerOverlay>
        <DrawerContent bg="bg">
          {type !== 'consent' && <DrawerCloseButton size="sm" />}
          {Header && (
            <DrawerHeader>
              <Header />
            </DrawerHeader>
          )}

          <DrawerBody>{children}</DrawerBody>
          {Footer && (
            <DrawerFooter>
              <Footer />
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </ChDrawer>
  );
};
