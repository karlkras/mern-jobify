import { DashboardContext } from '../pages/DashboardLayout';
import { AllJobsContext } from '../pages/AllJobs';

import { useContext } from 'react';

export const useDashboardContext = () => useContext(DashboardContext);

export const useAllJobsContext = () => useContext(AllJobsContext);
