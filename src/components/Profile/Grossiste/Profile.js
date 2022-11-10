import { Avatar, createTheme, Grid, ThemeProvider, Typography } from '@mui/material'
import { Button as Butt } from '@mui/material'
import React from 'react'
import logo from '../../../img/3.jpg'
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch } from 'react-redux'
import FileUploader from '../../FormsUI/FileUploader';
import Textfield from '../../FormsUI/Textfields';
import Button from '../../FormsUI/Button';
import { change } from '../../../redux/GrossisteNavigator'
import { increment } from '../../../redux/GrossisteTab'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AuthService from '../../../Services/AuthServices'
import Gouvernorats from '../../../Data/Gouvernorats.json'
import Civility from '../../../Data/Civility.json'
import * as Yup from 'yup';
import userService from '../../../Services/GrossisteServies';

import { Formik, Form } from 'formik';
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
  const dispatch = useDispatch()
  const user = props.Grossiste
    console.log(user);
  const INITIAL_FORM_STATE = {
    image: '',
    nom: user.raisonSocial,
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
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} sx={{ ml: 2 }}>
        <Grid md={4} item>
          <Grid container spaing={5} >
            <Grid item md={3} >
              {/* <Avatar
                alt="Remy Sharp"
                src={logo}
                sx={{ width: 100, height: 100 }}
              /> */}
            </Grid>
            <Grid item md={6} >
            {/* <Typography variant="h6" gutterBottom>
             Name: {user.userName}
            </Typography>  */}
            </Grid>
            <Grid sx={{ mt: 2 }} item md={6} >
              {/* <Formik initialValues={{
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
              </Formik> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid md={8} item>
          <Grid container>
            <Grid item md={10}> <Typography variant="h6" gutterBottom>
             General details:
            </Typography></Grid>
            <Grid item md={2}>
              <Butt onClick={() => { dispatch(change("compte")); dispatch(increment(1)); }} variant="contained" color="secondary" startIcon={<CreateIcon />}>
                Edit
              </Butt></Grid>
            <Grid item md={12} sx={{ ml: 3, mt: 4 }}>

              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Corporate Name  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.raisonSocial}  </Typography>
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
              </Grid>  <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> WebSite  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom>{user.siteWeb}  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Fax Number  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.numFax} </Typography>
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
                  <Typography variant="button" gutterBottom> ZIP Code </Typography>
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
                  <Typography variant="button" gutterBottom> Adress  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" paragraph> {user.adresse}  </Typography>
                </Grid>
              </Grid>

            </Grid>
            <Grid item md={10}> <Typography variant="h6" gutterBottom>
             person to contact details :
            </Typography></Grid>
            <Grid item md={12} sx={{ ml: 3, mt: 4 }}>

              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Name  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.nomPersAContact}  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Last name  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom>{user.prenomPersAContact}  </Typography>
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
              </Grid><Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom>  Email  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.emailPersAContact}  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Birthdate  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.birthDate}  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom>Mobile phone number </Typography>
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
                  <Typography variant="button" gutterBottom> office phone number  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.numbureau} </Typography>
                </Grid>
              </Grid>



            </Grid>
            <Grid item md={10}> <Typography variant="h6" gutterBottom>
              Monitary details :
            </Typography>
            </Grid>
            <Grid item md={12} sx={{ ml: 3, mt: 4 }}>

              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Tax Identifier  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom> {user.identifiant_fiscale}  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={-2}>
                <Grid item md={3}>
                  <Typography variant="button" gutterBottom> Rib  </Typography>
                </Grid>
                <Grid item md={1}>
                  <div>:</div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body1" gutterBottom>{user.rib}  </Typography>
                </Grid>
              </Grid>




            </Grid>
          </Grid>

        </Grid>

      </Grid></ThemeProvider>
  )

}

export default Profile