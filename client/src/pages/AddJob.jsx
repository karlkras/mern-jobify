import FormWrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { redirect } from 'react-router-dom';
import { AddOrEditJob } from '../components';

import { getAddJobRowItems } from '../utils/fieldServer';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';
import { useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job Creation Successful');

      return redirect('all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  const rowItems = getAddJobRowItems(
    user.location,
    JOB_STATUS.PENDING,
    Object.values(JOB_STATUS),
    JOB_TYPE.FULL_TIME,
    Object.values(JOB_TYPE)
  );

  const theData = { rowItems, formTitle: 'add job' };

  return (
    <FormWrapper>
      <AddOrEditJob {...theData} />
    </FormWrapper>
  );
};

export default AddJob;
