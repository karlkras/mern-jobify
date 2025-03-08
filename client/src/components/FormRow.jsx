export const FormRow = ({
  onChange,
  elementType,
  labelName,
  type,
  name,
  isRequired,
  list,
  defaultValue
}) => {
  const buildElement = () => {
    switch (elementType) {
      case 'input':
        return (
          <input
            type={type}
            id={name}
            name={name}
            className="form-input"
            required={isRequired}
            onChange={onChange}
            defaultValue={defaultValue}
            autoComplete={type === 'password' ? 'current-password' : null}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            id={name}
            className="form-select"
            onChange={onChange}
            defaultValue={defaultValue}
          >
            {list.map((itemValue) => {
              return (
                <option key={itemValue} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelName}
        </label>
        {buildElement()}
      </div>
    </>
  );
};

export default FormRow;
