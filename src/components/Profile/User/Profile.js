import { Avatar, Button, createTheme, Grid, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import logo from '../../../img/3.jpg'
import CreateIcon from '@mui/icons-material/Create';
import {  useDispatch } from 'react-redux'
import { change } from '../../../redux/Navigator'
import { increment } from '../../../redux/Tab'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AuthService from '../../../Services/AuthServices'
import Gouvernorats from'../../../Data/Gouvernorats.json'
import Civility from'../../../Data/Civility.json'
import { Formik, Form } from 'formik';
import userService from '../../../Services/UserService';
import FileUploader from '../../FormsUI/FileUploader';
import Textfield from '../../FormsUI/Textfields';
import * as Yup from 'yup';

const theme = createTheme({
  typography: {
    button: {
      color: "#808080"
    }, body1: {
      fontWeight: "600"
    },
  },
});
function Profile(props) {

  const user = (props.user);
  const dispatch = useDispatch()
 
  const INITIAL_FORM_STATE = {
    image: '',
    nom: user.nom,
    prenom: user.prenom
  };
  const FORM_VALIDATION = Yup.object().shape({

    image: Yup.mixed().required('required'),

    nom: Yup.string().required('required'),
  });
  const handleSubmit = async (user) => {
    try {
      await userService.Put(user).then(
        (response) => {

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
 


  return (<ThemeProvider theme={theme}>
    <Grid container spacing={3} sx={{ ml: 2 }}>
      <Grid md={4} item>
        <Grid container spaing={5} >
          <Grid item md={3} >
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item md={6} >
            {user.userName}
          </Grid>
          <Grid sx={{ mt: 2 }} item md={6} >
          <Formik initialValues={{
                ...INITIAL_FORM_STATE
              }}
                validationSchema={FORM_VALIDATION}
                onSubmit={values => {

                  console.log(values);
                  handleSubmit(values);
                }}
              >
                <Form>
                  <FileUploader name="image"></FileUploader>
                  <Textfield name="nom" ></Textfield>
                  <Button> Enregistrer</Button>
                </Form>
              </Formik>
          </Grid>
        </Grid>
      </Grid>
      <Grid md={8} item>
        <Grid container>
          <Grid item md={10}> <Typography variant="h6" gutterBottom>
            Details personnel:
          </Typography></Grid>
          <Grid item md={2}>
            <Button onClick={() => { dispatch(change("compte")); dispatch(increment(1)); }} variant="contained" color="secondary" startIcon={<CreateIcon />}>
              Edit
            </Button></Grid>
          <Grid item md={12} sx={{ ml: 3, mt: 4 }}>

            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Nom  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {user.nom}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Prénom  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {user.prenom}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Email  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom>{user.email}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Numéro Téléphone  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {user.numMobile} </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Gouvernorats  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {Gouvernorats[user.gouvernorats]}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Code Postale  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {user.codePostale}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Adresse  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
               <Typography variant="body1"  paragraph> {user.adresse}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Civility  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {Civility[user.civility]}  </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={-2}>
              <Grid item md={3}>
                <Typography variant="button" gutterBottom> Date de naissance  </Typography>
              </Grid>
              <Grid item md={1}>
                <div>:</div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1" gutterBottom> {user.birthDate}  </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

    </Grid></ThemeProvider>
  )
}

export default Profile