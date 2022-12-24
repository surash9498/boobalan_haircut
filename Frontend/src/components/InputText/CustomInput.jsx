import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { isInvalid } from '../../utils/Utility'

function CustomInput({ label, type, errormsg, setValue, value, placeHolder, action = null }) {
    const [inValid, setInvalid] = useState(false)
    return (
        <TextField
            error={inValid}

            label={label}
            onChange={({ target: { value } }) => {
                setValue((prevState) => ({ ...prevState, [label]: value }))
            }}
            defaultValue={value == undefined ? "" : value}
            onKeyUp={({ keyCode }) => {

                if (keyCode == 13) {
                    if (isInvalid(value, type)) {
                        setInvalid(true)

                    } else {
                        setInvalid(false)
                        if (action != null)
                            action();
                    }
                }
            }}
            placeholder={placeHolder}

            helperText={inValid ? errormsg : ""}
            variant="outlined"></TextField>
    )
}

export default CustomInput