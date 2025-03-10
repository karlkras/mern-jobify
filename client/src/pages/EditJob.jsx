/* eslint-disable react-refresh/only-export-components */
import FormWrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddOrEditJob } from '../components';
import { getAddJobRowItems } from '../utils/fieldServer';
import { customFetch } from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-jobs');
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job Updated Successfully');

      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job }
  } = useQuery(singleJobQuery(id));
  const rowItems = getAddJobRowItems(
    job.jobLocation,
    job.status,
    Object.values(JOB_STATUS),
    job.jobType,
    Object.values(JOB_TYPE),
    job.company,
    job.position
  );

  const theData = { rowItems, formTitle: 'edit job' };

  return (
    <FormWrapper>
      <AddOrEditJob {...theData} />
    </FormWrapper>
  );
};

export default EditJob;
