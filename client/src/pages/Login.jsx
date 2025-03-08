import { FormRow, Logo, SubmitBtn } from '../components';
import LoginWrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, Link, useNavigate } from 'react-router-dom';
import { getLoginFields } from '../utils/fieldServer';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123'
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <LoginWrapper>
      <Form method="post" className="form">
        <Logo />
        {getLoginFields().map((item, index) => (
          <FormRow key={index} {...item} />
        ))}
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Need to Register?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
