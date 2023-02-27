import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
  } from "@material-ui/core"
  
  const MuiRadioGroup = (props) => {
    const { label, name, value, onChange, RadioItem, ...exists } = props
  
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup name={name} value={value} onChange={onChange} {...exists}>
          {RadioItem.map((item) => {
            const { id, label, value } = item
            return (
              <FormControlLabel
                key={id}
                label={label}
                value={value}
                control={<Radio />}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    )
  }
  
  export default MuiRadioGroup
  