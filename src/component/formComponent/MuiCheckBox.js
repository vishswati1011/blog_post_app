import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core"

const MuiCheckBox = (props) => {
  const { name, value, label, onChange, color } = props

  const convertEventToParam = (name, value) => ({
    target: { name, value }
  })

  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            name={name}
            color={color || "primary"}
            checked={value}
            onChange={(e) =>
              onChange(convertEventToParam(name, e.target.checked))
            }
          />
        }
      />
    </FormControl>
  )
}

export default MuiCheckBox
