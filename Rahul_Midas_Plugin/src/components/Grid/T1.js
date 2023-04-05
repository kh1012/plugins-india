
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="**,**,**"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  

export default function TextFieldSizes() {
    const [values, setValues] = React.useState({
        textmask: '00,00,00'
      });
    
      const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      };
    
    return (
        <Box
            component="form"
            sx={{
                size: "absolute", position: 'absolute', ml: 55, mt: -19,
                '& .MuiTextField-root': { m: 1, width: '15ch', height: 45 },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label=""
                    id="Coordinate_Start_Number"
                    defaultValue=""
                    size="large"
                    variant="standard"
                 
                />
                <TextField
                    label=""
                    id="Coordinate_Start_Coordinate"
                    defaultValue=""
                    size="large"
                    variant="standard"
                    inputComponent={TextMaskCustom} />
            </div>
            <div>
                <TextField
                    label=""
                    id="Coordinate_End_Number"
                    defaultValue=""
                    size="large"
                    variant="standard"
                />
                <TextField
                    label=""
                    id="Coordinate_End_Coordinate"
                    defaultValue=""
                    size="large"
                    variant="standard"
                    inputComponent={TextMaskCustom}
                />
            </div>
            <div>
                <TextField
                    label=""
                    id="Coordinate_Length_Of_Elements"
                    defaultValue=""
                    size="large"
                    variant="standard"
                />
                {/* <TextField
          label="Size6"
          id="standard-size-small"
          defaultValue="Small"
          size="small"
          variant="standard"
        /> */}
            </div>
        </Box>
    );
}