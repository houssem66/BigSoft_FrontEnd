import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
const AutoCompleteWrapper = ({
    name,
    options,
    label,
    optionName,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const configTField = {


    };
    const defaultProps = {
        options: options,
        getOptionLabel: (option) => option[optionName],
    };
    if (meta && meta.touched && meta.error) {
        configTField.error = true;
        configTField.helperText = meta.error;
    }
    return (
        <Autocomplete
            disablePortal
            
            id="combo-box-demo"
            {...defaultProps}
            sx={{ width: 300 }} name={name} onChange={(event, value) => {
               
                setFieldValue(name, value);
            }}
            renderInput={(params) => <TextField {...configTField} {...params} label="Produits" />}
        />
    )
};
export default AutoCompleteWrapper;