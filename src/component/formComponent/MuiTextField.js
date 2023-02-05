import { TextField } from "@material-ui/core";

const MuiTextField = (props) => {
  const { label, name, variant, value, onChange, ...exist } = props;
  return (
    <TextField
      label={label}
      name={name}
      variant={variant || "standard"}
      value={value}
      onChange={onChange}
      {...exist}
    />
  );
};

export default MuiTextField;
