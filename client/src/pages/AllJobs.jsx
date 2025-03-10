/* eslint-disable react-refresh/only-export-components */
import { JobsContainer, SearchContainer } from '../components';
import { customFetch } from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allJobsQuery = (params) => {
  const { search, status, jobType, sort, page } = params;
  return {
    queryKey: [
      'jobs',
      search ?? '',
      status ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params
      });
      return data;
    }
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

export const AllJobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;
