import { Form } from 'react-router-dom';
import { FormRow } from './FormRow';
import SubmitBtn from './SubmitBtn';

const AddOrEditJob = ({ rowItems, formTitle }) => {
  return (
    <Form method="post" className="form">
      <h4 className="form-title">{formTitle}</h4>
      <div className="form-center">
        {rowItems.map((item, index) => (
          <FormRow key={index} {...item} />
        ))}
        <SubmitBtn formBtn />
      </div>
    </Form>
  );
};

export default AddOrEditJob;
