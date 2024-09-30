import ReactCountryFlag from "react-country-flag";
import style from "./__style.module.scss";

const CountryCheckbox = ({
  disabled,
  id,
  checked,
  label,
  onChange,
}: {
  disabled?: boolean;
  id: string;
  checked: boolean;
  label?: string;
  onChange: () => void;
}) => (
  <label
    htmlFor={id}
    className={`${style["checkbox-container"]} ${
      disabled ? style["checkbox-disabled"] : ""
    }`}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <span className={style.checkmark} />
    {label && (
      <ReactCountryFlag
        countryCode={label}
        svg
        style={{
          width: "18px",
        }}
      />
    )}

    {label}
  </label>
);

CountryCheckbox.displayName = "CountryCheckbox";

export default CountryCheckbox;
