import { Grid, Typography } from '@mui/material'
import React from 'react'
import Textfield from '../FormsUI/Textfields'
import Form from 'react-bootstrap/Form';
import { useFormikContext } from 'formik';
import Civility from '../../Data/Civility.json';
import Gouvernorats from '../../Data/Gouvernorats.json';
import Select from '../FormsUI/Select'
import FileUploader from '../FormsUI/FileUploader'

function InformationGenerale(props) {
  const { values: formFields } = useFormikContext();
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Typography component="h1" variant="h4" align="center">
          Information Génerale
        </Typography></Grid>
      <Grid item md={6} >
        <Textfield
          name="codePostale"
          label="Code Postale"
        />
      </Grid>
      <Grid item md={6} >
        <Select
          name="gouvernorats"
          label="Gouvernorats"
          options={Gouvernorats}
        />
      </Grid>
      <Grid item md={12}>
        <Textfield name="adresse" label="Adresse " multiline rows={3} />
      </Grid>
      <Grid item md={6}>
        <Textfield name="siteWeb" label="Site Web " />
      </Grid>
      <Grid item md={6}>
        <Textfield name="numFax" label="Numéro Fax " />
      </Grid>
      <Grid item md={6}>
        <Textfield name="rib" label="Rib " />
      </Grid>
      <Grid item md={6} >
        <Textfield
          name="identifiant_fiscale"
          label="Identifiant Fiscale"
        />
      </Grid>
       <Grid item md={12}>
        < FileUploader val="Upload Identifiant Fiscale" name="documents"></FileUploader>
      </Grid>
    </Grid>
  )
}

export default InformationGenerale