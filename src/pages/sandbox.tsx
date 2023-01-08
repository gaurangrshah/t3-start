import { DefaultLayout } from '@/components';
import { FileInput } from '@/components/features';
import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';

// @TODO: build out admin dashboard

const Sandbox: NextPage = () => {
  return (
    <DefaultLayout>
      <Container layerStyle="panel" maxW="3xl">
        <FileInput />
      </Container>
    </DefaultLayout>
  );
};

export default Sandbox;
