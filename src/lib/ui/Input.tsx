import { TextField } from "@mui/material";

const Input = ({ id, label }: { id: string; label?: string }): JSX.Element => (
  <TextField
    id={id}
    label={label}
    variant="standard"
  />
);

Input.displayName = "Input";

export default Input;
