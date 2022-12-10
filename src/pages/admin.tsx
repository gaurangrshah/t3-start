import { type NextPageWithAuth } from '@/types';

// @TODO: build out admin dashboard

const AdminDashboard: NextPageWithAuth & { auth: boolean } = () => {
  return <>Admin</>;
};

export default AdminDashboard;
AdminDashboard.auth = true;
