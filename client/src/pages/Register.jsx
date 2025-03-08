import { Logo, FormRow, SubmitBtn } from '../components';
import RegisterWrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, Link } from 'react-router-dom';
import { getRegisterFields } from '../utils/fieldServer';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful');

    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Register = () => {
  return (
    <RegisterWrapper>
      <Form method="post" className="form">
        <Logo />
        {getRegisterFields().map((item, index) => (
          <FormRow key={index} {...item} />
        ))}

        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </RegisterWrapper>
  );
};

export default Register;
