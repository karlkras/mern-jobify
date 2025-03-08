import { FormRow } from '.';
import FormWrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { getJobSeachFields } from '../utils/fieldServer';
import { useAllJobsContext } from '../utils/contextServices';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobType, status, sort } = searchValues;
  const rowItems = getJobSeachFields(
    search || 'a',
    status || 'all',
    ['all', ...Object.values(JOB_STATUS)],
    jobType || 'all',
    ['all', ...Object.values(JOB_TYPE)],
    sort || 'newest',
    [...Object.values(JOB_SORT_BY)]
  );
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <FormWrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          {rowItems.map((item, index) => (
            <FormRow
              key={index}
              {...item}
              onChange={
                item.elementType === 'select'
                  ? (e) => {
                      submit(e.currentTarget.form);
                    }
                  : debounce((form) => {
                      submit(form);
                    })
              }
            />
          ))}

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default SearchContainer;
