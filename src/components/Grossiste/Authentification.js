import { Grid, Typography } from '@mui/material'
import React from 'react'
import Textfield from '../FormsUI/Textfields'
import Select from '../FormsUI/Select'
import Gouvernorats from '../../Data/Gouvernorats.json';
function Authentification() {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Typography component="h1" variant="h4" align="center">
          Authentification
        </Typography></Grid>
      <Grid item md={12}> <Textfield name="userName" label="User Name" /></Grid>
      <Grid item md={12}> <Textfield name="raisonSocial" label="Corporate Name" /></Grid>
      <Grid item md={12}> <Textfield name="email" label="Email" /></Grid>
      <Grid item md={6}> <Textfield name="passWord" type="password" label="Password" /></Grid>
      <Grid item md={6}> <Textfield name="confirmPassword" type="password" label="Password Confirm" /></Grid>
    
    </Grid>
  )
}

export default Authentification