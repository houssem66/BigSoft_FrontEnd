import { TextField } from '@mui/material';
import { Box, Container, createTheme, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import * as Yup from 'yup';
import Civility from '../../../Data/Civility.json'
import Gouvernorats from '../../../Data/Gouvernorats.json'
import FileUploader from '../../../components/FormsUI/FileUploader';
import DateTimePicker from '../../../components/FormsUI/DataTimePicker';
import Select from '../../../components/FormsUI/Select';
import Button from '../../../components/FormsUI/Button';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import GrossisteServies from '../../../Services/GrossisteServies';
import UserService from '../../../Services/UserService';
import Textfield from '../../../components/FormsUI/Textfields';



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
  let formData = new FormData();

  const user = (props.Grossiste);


  const INITIAL_FORM_STATE = {

    id: user.id,
    documents: "",
    userName: user.userName,
    adresse: user.adresse,
    birthDate: "25-04-1996",
    civility: user.civility,
    codePostale: user.codePostale,
    email: user.email,
    emailPersAContact: user.emailPersAContact,
    gouvernorats: user.gouvernorats,
    identifiant_fiscale: user.identifiant_fiscale,
    nom: user.nom,
    numFax: user.numFax,
    numMobile: user.numMobile,
    numbureau: user.numbureau,
    prenom: user.prenom,
    raisonSocial: user.raisonSocial,
    rib: user.rib,
    siteWeb: user.siteWeb,

  };
  const FORM_VALIDATION = Yup.object().shape({
    raisonSocial: Yup.string().required('Obligatoire'),
    userName: Yup.string().required('Obligatoire').test('Unique UserName', 'UserName already in use', function (value) {
      return new Promise((resolve, reject) => {
        if (value != user.userName) { UserService.getUserbyUserName(value).then((res) => { resolve(false) }).catch((error) => { console.log(error.response); resolve(true); }) }
        else if (value === user.userName) { resolve(true); }
      })
    }),
    email: Yup.string().email('Invalid email.').required('Email est obligatoire').test('Unique Email', 'Email already in use', function (value) {
      return new Promise((resolve, reject) => {
        if (value !== user.email) {
          UserService.getUser(value).then((res) => { resolve(false) }).catch((error) => {
            console.log(error.response); resolve(true);
          })
        } else if (value === user.email) { resolve(true); }
      })
    }),
    adresse: Yup.string().required('Obligatoire'),
    gouvernorats: Yup.string().required('Obligatoire'),
    numFax: Yup.number().integer().typeError('Please enter a valid phone number').required('Obligatoire'),
    codePostale: Yup.string().length(4).matches(/^([0-9]+)$/, "must be a number").required('Obligatoire'),
    rib: Yup.string().min(20, 'length must be 20').max(20, 'length must be 20').matches(/^([0-9]+)$/, "must be a number").required('Obligatoire'),
    identifiant_fiscale: Yup.string().required("required").matches(/^[0-9]{8}[A-Za-z]$/, "Must be a In this format 12345678X."),
    siteWeb: Yup.string().required('Obligatoire').matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'le format est invalide'
    ),
    nom: Yup.string().required('Obligatoire'),
    prenom: Yup.string().required('Obligatoire'),
    civility: Yup.string().required('Obligatoire'),
    numMobile: Yup.number().integer().typeError('Please enter a valid phone number').required('Obligatoire'),
    numbureau: Yup.number().integer().typeError('Please enter a valid phone number').required('Obligatoire'),
    emailPersAContact: Yup.string().email('Invalid email.').required('Obligatoire'),
    birthDate: Yup.date().required('Obligatoire'),
    
  });
  const handleSubmit = async (values) => {

   
    formData.append('Documents', values.documents);
    formData.append('adresse', values.adresse);
    formData.append('Nom', values.nom);
    formData.append('prenom', values.prenom);
    formData.append('emailPersAContact', values.emailPersAContact);
    formData.append('userName', values.userName);
    formData.append('raisonSocial', values.raisonSocial);
    formData.append('email', values.email);
    formData.append('civility', values.civility);
    formData.append('codePostale', values.codePostale);
    formData.append('gouvernorats', values.gouvernorats);
    formData.append('identifiant_fiscale', values.identifiant_fiscale);
    formData.append('nom', values.nom);
    formData.append('numFax', values.numFax);
    formData.append('numMobile', values.numMobile);
    formData.append('numbureau', values.numbureau);
    formData.append('id', values.id);
    formData.append('rib', values.rib);
    formData.append('siteWeb', values.siteWeb);
    formData.append('birthDate', values.birthDate);
 console.log(values);
    try {
      await GrossisteServies.Put(formData).then(
        (response) => {
          navigate("/feed/profileGrossiste");
           window.location.reload();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik initialValues={{
        ...INITIAL_FORM_STATE
      }}
        validationSchema={FORM_VALIDATION}
        validateOnChange={false}
        onSubmit={values => {

          handleSubmit(values);
          console.log(values.emailPersAContact);
          //setFile(values.documents);


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
                      Authentification:
                    </Typography>
                  </Grid>
                  <Grid item md={6}> <Textfield
                    required
                    name="raisonSocial"
                    label="Raison Sociale"
                    color="secondary"
                  /></Grid>
                  <Grid item md={6}><Textfield
                    required
                    label="Email"
                    name="email"
                    color="secondary"
                  /> </Grid>
                  <Grid item md={6}>  <Textfield
                    required
                    label="UserName"
                    name="userName"
                    color="secondary"
                  /></Grid>
                  <Grid item md={12} >
                    <Typography variant="button" display="block" gutterBottom>
                      Information Générale:
                    </Typography>
                  </Grid>
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
                  <Grid item md={12} >
                    <Typography variant="button" display="block" gutterBottom>
                      Détails personne à contacter :
                    </Typography>
                  </Grid>
                  <Grid item md={6} >
                    <Textfield
                      name="nom"
                      label="Nom "
                    />
                  </Grid>
                  <Grid item md={6} >
                    <Textfield
                      name="prenom"
                      label="Prénom"
                    />
                  </Grid>
                  <Grid item md={3} >
                    <Select
                      name="civility"
                      label="Civility"
                      options={Civility}
                    />
                  </Grid>
                  <Grid item md={9}>
                    <Textfield
                      name="emailPersAContact"
                      label="Email"
                    />
                  </Grid>

                  <Grid item md={6} >
                    <Textfield
                      name="numbureau"
                      label="Numéro bureau"
                    />
                  </Grid>
                  <Grid item md={6} >
                    <Textfield
                      name="numMobile"
                      label="Numéro Mobile"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Grid container justifyContent="flex-start" alignItems="flex-start" >
                      <Grid item md={4}>
                        <Typography variant="button" gutterBottom> Date de naissance:<b>{user.birthDate}</b>  </Typography>
                      </Grid>
                      <Grid item md={4} >
                        <DateTimePicker
                          name="birthDate"
                          label="BirthDate"

                        />
                      </Grid>
                    </Grid>
                  </Grid>
                    <Grid item md={12}>
                   < FileUploader val="Upload Identifiant" name="documents"></FileUploader>
                  </Grid>
                 
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
      </Formik>
    </ThemeProvider>
  )
}

export default Compte