import { type NextPageWithAuth } from '@/types';
import { trpc } from '@/utils/trpc';

// @TODO: build out admin dashboard

const AdminPage: NextPageWithAuth = () => {
  const { data } = trpc.sandbox.readFile.useQuery({ path: 'package.json' });
  console.log('🚀 | file: admin.tsx:9 | data', data);

  return <>Admin</>;
};

export default AdminPage;
AdminPage.auth = true;
