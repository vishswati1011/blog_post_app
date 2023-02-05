import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const MuiSelectOption = (props) => {
  const { variant, name, label, value, onChange, DepartmentOptions } = props;

  return (
    <FormControl variant={variant || "standard"} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        <MenuItem value=""> None </MenuItem>
        {DepartmentOptions.map((items) => {
          const { id, value, title } = items;
          return (
            <MenuItem key={id} value={value}>
              {title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MuiSelectOption;
