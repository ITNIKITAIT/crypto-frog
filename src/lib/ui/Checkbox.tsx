import style from "./__style.module.scss";

const Checkbox = ({
  id,
  checked,
  label,
  onChange,
}: {
  id: string;
  checked: boolean;
  label?: string;
  onChange: () => void;
}) => (
  <label
    htmlFor={id}
    className={style["checkbox-container"]}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <span className={style.checkmark} />
    {label}
  </label>
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
