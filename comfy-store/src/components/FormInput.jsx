const FormInput = ({ label, name, type, defaultValue, onChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className="input input-bordered "
      />
    </div>
  );
};
export default FormInput;
