/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import DashboardWrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, NavBar, SmallSidebar, Loading } from '../components';
import { checkDefaultTheme } from '../App';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const response = await customFetch.get('/users/current-user');
    return response.data;
  }
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return redirect('/');
  }
};

export const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      navigate('/');
      await customFetch.get('/auth/logout');
      queryClient.invalidateQueries();
      toast('Successfully logged out.');
    } catch (err) {
      console.log(err);
    }
  };

  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === StatusCodes.UNAUTHORIZED) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser
      }}
    >
      <DashboardWrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </DashboardWrapper>
    </DashboardContext.Provider>
  );
};
export default DashboardLayout;
