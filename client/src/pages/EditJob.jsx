/* eslint-disable react-refresh/only-export-components */
import FormWrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddOrEditJob } from '../components';
import { getAddJobRowItems } from '../utils/fieldServer';
import { customFetch } from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job Updated Successfully');

    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
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
