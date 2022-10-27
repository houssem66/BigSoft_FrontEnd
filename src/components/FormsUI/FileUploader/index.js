import React from 'react'
import Form from 'react-bootstrap/Form';
import { useField, useFormikContext } from 'formik';

const FileUPloadWrapper = ({
    val,
    name,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const handleChange = (event) => {

        const file = event.currentTarget.files[0];
        setFieldValue(name, file);
    };
    const configTextfield = {
        ...field,
        ...otherProps,
        type: 'file',
        onChange: handleChange

    };
    const trying = {};
    if (meta && meta.touched && meta.error) {

        configTextfield.isInvalid = true;
        trying.Erreur = meta.error;
    }
    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>{val}</Form.Label>
            <Form.Control name={name}  type="file" onChange={(event) => {
                setFieldValue(name, event.currentTarget.files[0]);
            }}  />
            <Form.Control.Feedback type="invalid">{trying.Erreur}</Form.Control.Feedback>
        </Form.Group>
    )
};
export default FileUPloadWrapper;