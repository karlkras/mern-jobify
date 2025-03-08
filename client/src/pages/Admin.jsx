import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useLoaderData, redirect } from 'react-router-dom';
import StatsContainerWrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/admin/app-stats');
    return data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();
  return (
    <StatsContainerWrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        $bgc="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        $bgc="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </StatsContainerWrapper>
  );
};

export default Admin;
