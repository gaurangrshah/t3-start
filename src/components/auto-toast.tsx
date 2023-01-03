import { Obj } from '@/types';
import { useToast } from '@chakra-ui/react';
import { FC, ReactNode, useEffect } from 'react';

export type ToastStatusOptions =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'loading'
  | undefined;

const messageMap: Obj = {
  CredentialsSignin: {
    message: 'Please sign up or provide valid credentials',
  },
};

export const AutoToast: FC<{
  status: ToastStatusOptions;
  message: string;
  icon?: ReactNode;
}> = (props): null => {
  const toast = useToast();

  const message = props.message !== 'null';
  useEffect(() => {
    if (!message) return;
    toast({
      status: props.status,
      title: props.status,
      description: String(messageMap[props.message]?.message ?? props.message),
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });
    () => null;
  }, [message]);

  return null;
};
