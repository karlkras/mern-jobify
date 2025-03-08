import { customFetch } from '../utils/customfetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const formAction = (postRoute, successMessge, redirectRoute) => {
  return async function ({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post({ postRoute }, data);
      toast.success({ successMessge });

      return redirect({ redirectRoute });
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };
};
