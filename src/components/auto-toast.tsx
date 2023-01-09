import { Obj } from '@/types';
import { subscribe, toastEventChannel, unsubscribe } from '@/utils';
import { ToastProps, useToast } from '@chakra-ui/react';
import { FC, ReactNode, useEffect } from 'react';

const messageMap: Obj = {
  CredentialsSignin: {
    message: 'Please sign up or provide valid credentials',
  },
};

const INIT_TOAST_PROPS = (toastProps: ToastProps): ToastProps => ({
  status: 'info',
  title: '',
  description: '',
  duration: 6000,
  isClosable: true,
  position: 'top-right',
  ...toastProps,
});

export const AutoToast: FC<{
  status: ToastProps['status'];
  message: string;
  icon?: ReactNode;
}> = (props): null => {
  const toast = useToast();

  const successToast = (
    toastProps: ToastProps = INIT_TOAST_PROPS({
      status: 'success',
      title: 'Success',
    })
  ) => {
    toast(toastProps);
  };

  const errorToast = (
    toastProps: ToastProps = INIT_TOAST_PROPS({
      status: 'error',
      title: 'Error',
    })
  ) => {
    toast(toastProps);
  };

  const infoToast = (
    toastProps: ToastProps = INIT_TOAST_PROPS({
      status: 'info',
      title: 'Info',
    })
  ) => {
    toast(toastProps);
  };

  useEffect(() => {
    // client-event: listens to custom events defined in "@/utils/client-events.ts"
    subscribe('show-toast', ({ detail }: any) => successToast(detail));
    return () => {
      // @NOTE: client-event: must always unsubcribe on unmount cleanup
      unsubscribe('show-toast', () => {
        // handle logic here or call a function
      });
    };
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = toastEventChannel.on('success', (payload) => {
      // handle logic here or call a function
      successToast(payload);
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = toastEventChannel.on('error', (payload) => {
      // handle logic here or call a function
      errorToast(payload);
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  // falsy values get stringified so we have to check for an actual message
  const falsyStrings = ['null', 'false', 'undefined', ''];
  const hasMessage = falsyStrings.every((str) => str !== props.message);
  useEffect(() => {
    if (!hasMessage) return;
    // @NOTE: displays toast for routes with error or success messages
    const message = String(messageMap[props.message]?.message ?? props.message);
    const options: Partial<ToastProps> = {
      status: props?.status,
      description: message ?? '',
    };
    infoToast(options);
  }, [hasMessage]);

  return null;
};
