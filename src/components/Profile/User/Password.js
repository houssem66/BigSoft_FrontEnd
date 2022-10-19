import { Alert, AlertTitle, Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { Formik, Form } from 'formik';
import Textfield from '../../../components/FormsUI/Textfields';
import Button from '../../../components/FormsUI/Button';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import userService from '../../../Services/UserService';

function Password(props) {

  const INITIAL_FORM_STATE = {
    id: props.user.id,
    NewPassword: '',
    OldPassword: ''
  };
  const [Err, SetErr] = React.useState('');

  let navigate = useNavigate();
  const FORM_VALIDATION = Yup.object().shape({
    OldPassword: Yup.string().required("Obligatoire"),
    NewPassword: Yup.string().required("Obligatoire").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/, "Must be a In this format 21754318hH@."),
    NewPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('NewPassword'), null], 'Les mots de passe doivent correspondre').required("Obligatoire"),

  });
  function getError() {
    if (Err != "") {console.log(Err)
      return <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
       <strong>{Err}</strong>
      </Alert>;
    }
return<div></div>;
  }
  const handleSubmit = async (user) => {
    try {
      await userService.ChangePassword(user).then(
        (response) => {
            navigate("/feed/profileUser");
           window.location.reload();
        },
        (error) => {
          console.log("here1")
          console.log(error.response.data);
          SetErr(error.response.data);
        }
      );
    } catch (err) {
      console.log("here2")
      console.log(err);
    }
  }



  return (<Formik initialValues={{
    ...INITIAL_FORM_STATE
  }}// 
    validationSchema={FORM_VALIDATION}
    onSubmit={(values, action) => {
      try {
        handleSubmit(values)
      } catch (er) {
        console.log(er);
      }

    }}
  >
    <Form>
      <Box component={Paper} sx={{ ml: 6, my: 1, mr: 15, maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "center" }} elevation={4}>
        <Grid container spacing={2} direction="column"
          alignItems="center"
          justifyContent="center" >
          <Grid item md={12}>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              <strong> Do not share your password</strong>
            </Alert>
          </Grid>
        </Grid>

        <Grid sx={{ mx: 2, maxWidth: "30%", my: 2 }} container spacing={2}>
          <Grid item md={12}>

          </Grid>

          <Grid item md={12}>
            <Textfield type="password" label="Ancienne mot de passe" name="OldPassword" color="secondary"></Textfield>
          </Grid>
          <Grid item md={12}>
            <Textfield label="Nouvelle mot de passe"type="password" name="NewPassword" color="secondary"></Textfield>
          </Grid>
          <Grid item md={12}>
            <Textfield type="password" label="Confirmer la nouvelle mot de passe" name="NewPasswordConfirm" color="secondary" ></Textfield>
          </Grid>
          <Grid item md={12}>
            <Button color="secondary" fullWidth>Confirmer</Button>
            {getError()}
          </Grid>

        </Grid>
      </Box>
    </Form>
  </Formik>
  )
}

export default Password