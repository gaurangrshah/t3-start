import { useRef } from 'react';
import {
  Drawer as ChDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  type DrawerProps,
} from '@chakra-ui/react';

type CustomDrawerProps = {
  Footer?: React.ElementType; // throws an error with ReactNode
  Header?: React.ElementType; // throws an error with ReactNode
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
