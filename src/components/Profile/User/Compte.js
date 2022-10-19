import { Box, Container, createTheme, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import * as Yup from 'yup';
import Civility from '../../../Data/Civility.json'
import Gouvernorats from '../../../Data/Gouvernorats.json'
import Textfield from '../../../components/FormsUI/Textfields';
import DateTimePicker from '../../../components/FormsUI/DataTimePicker';
import Select from '../../../components/FormsUI/Select';
import Button from '../../../components/FormsUI/Button';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import userService from '../../../Services/UserService';
const theme = createTheme({
  typography: {
    button: {
      color: "#808080"
    }, body1: {
      fontWeight: "600"
    },
  },
});
function Compte(props) {
  let navigate = useNavigate();
  const user = (props.user);
  const INITIAL_FORM_STATE = {
    id:user.id,
    nom: user.nom,
    prenom: user.prenom,
    civility: user.civility,
    gouvernorats: user.gouvernorats,
    birthDate: user.birthDate,
    email: user.email,
    numMobile: user.numMobile,
    adresse: user.adresse,
    image: user.image,
    codePostale: user.codePostale,
    userName: user.userName
  };
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Email est obligatoire'),
    nom: Yup.string().required('required'),
    userName: Yup.string().required('required'),
    prenom: Yup.string().required('required'),
    codePostale: Yup.string().length(4)
      .matches(/^([0-9]+)$/, "must be a number").required('Required'),
    numMobile: Yup.string().required("required").length(8).matches(/^([0-9]+)$/, "must be a number"),

    adresse: Yup.string().required('required'),
    civility: Yup.string()
      .required('Required'),
    gouvernorats: Yup.string()
      .required('Required'),
    birthDate: Yup.date().required("required"),

  });
  const handleSubmit = async (user) => {
    try {
      await userService.Put(user).then(
        (response) => {
          navigate("/feed/profileUser");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (<ThemeProvider theme={theme}><Formik initialValues={{
    ...INITIAL_FORM_STATE
  }}
    validationSchema={FORM_VALIDATION}
    onSubmit={values => {
     
      
      handleSubmit(values);
    }}
  >
    <Form>
      <Box component={Paper} sx={{ ml: 6, my: 1, mr: 15, maxWidth: "85%" }} elevation={4}>
        <Grid sx={{ mx: 2, maxWidth: "93%" }} container spacing={2}>
          <Grid item md={12}>
            <Typography component="h1" variant="h5">
              Éditer vos Informations
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container >
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  Informations de contact:
                </Typography>
              </Grid>
              <Grid item md={6}> <Textfield
                required
                name="nom"
                label="Nom"
                color="secondary"
              /></Grid>
              <Grid item md={6}><Textfield
                required
                label="Prénom"
                name="prenom"
                color="secondary"
              /> </Grid>
              <Grid item md={6}>  <Textfield
                required
                label="Email"
                name="email"
                color="secondary"
              /></Grid>
              <Grid item md={6}>
                <Textfield
                  required
                  label="UserName"
                  name="userName"
                  color="secondary"
                />
              </Grid>

              <Grid item md={7}>
                <Grid container spacing={5}
                  justifyContent="flex-start"
                  alignItems="flex-start">
                  <Grid item md={4}> <Typography variant="button" gutterBottom> Date de naissance:{user.birthDate}  </Typography></Grid>
                  <Grid item md={4}> <DateTimePicker
                    name="birthDate"
                    label="BirthDate"
                  />
                  </Grid><Grid item md={4}><Select
                    name="civility"
                    label="Civility"
                    options={Civility}
                  /></Grid>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container >
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  informations personnels:
                </Typography>
              </Grid>
              <Grid item md={6}> <Textfield
                required
                name="adresse"
                label="Adresse"
                color="secondary"
                multiline
                rows={3}
              /></Grid>
              <Grid item md={3}><Select
                name="gouvernorats"
                label="Gouvernorats"
                options={Gouvernorats}
              /> </Grid>
              <Grid item md={3}>  <Textfield
                required
                label="Code Postale"
                name="codePostale"
                color="secondary"
              /></Grid><Grid item md={6}>  <Textfield
                required
                label="Numéro Mobile"
                name="numMobile"
                color="secondary"
              /></Grid>
              <Grid item md={12}>
                <Button color="secondary" fullWidth>
                  Enregistrer
                </Button>

              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Box>
    </Form>
  </Formik></ThemeProvider>
  )
}

export default Compte