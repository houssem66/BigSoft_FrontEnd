import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AuthService from "../Services/AuthServices";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import Civility from '../Data/Civility.json'
import Gouvernorats from '../Data/Gouvernorats.json'
import Textfield from '../components/FormsUI/Textfields';
import DateTimePicker from '../components/FormsUI/DataTimePicker';
import Select from '../components/FormsUI/Select';
import Button from '../components/FormsUI/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import * as Yup from 'yup';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




export default function SignInSide() {
    let navigate = useNavigate();
    const INITIAL_FORM_STATE = {
        nom: '',
        prenom: '',
        civility: '',
        gouvernorats: '',
        birthDate: '',
        email: '',
        numMobile: '',
        adresse: '',
        image: '',
        codePostale: '',
        passWord: '',
        userName: ''
    };
    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email('Invalid email.').required('Email est obligatoire').test('Unique Email', 'Email already in use',function (value){
            return new Promise((resolve,reject)=>{UserService.getUser(value).then((res)=>{resolve(false)}).catch((error)=>{console.log(error.response);resolve(true);})})
        }),
        nom: Yup.string().required('required'),
        userName: Yup.string().required('required').test('Unique Email', 'UserName already in use',function (value){
            return new Promise((resolve,reject)=>{UserService.getUserbyUserName(value).then((res)=>{resolve(false)}).catch((error)=>{console.log(error.response);resolve(true);})})
        }),
        prenom: Yup.string().required('required'),
        codePostale: Yup.string().length(4)
            .matches(/^([0-9]+)$/, "must be a number").required('Required'),
        numMobile: Yup.string().required("required").length(8).matches(/^([0-9]+)$/, "must be a number"),

        adresse: Yup.string().required('required'),
        civility: Yup.string()
            .required('Required'),
        gouvernorats: Yup.string()
            .required('Required'),
        passWordConfirm: Yup.string()
            .oneOf([Yup.ref('passWord'), null], 'Les mots de passe doivent correspondre').required("Obligatoire"),
        passWord: Yup.string().required("Mot de passe est obligatoire").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/, "Must be a In this format 21754318hH@."),
        birthDate: Yup.date().required("required"),

    });
    const handleSubmit = async (user) => {
        try {
            await AuthService.signup(user).then(
                (response) => {
                    navigate("/feed");
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
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                </Box>
                <Box sx={{ mx: 7, dispaly: 'flex', flexDirection: 'column' }}>
                    <Formik initialValues={{
                        ...INITIAL_FORM_STATE
                    }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={values => {
                               handleSubmit(values);
                           
                        }} validateOnChange={false}

                    >
                        <Form>
                            <Box sx={{ mt: 1 }} component="paper" elevation={2}>
                                <Grid container spacing={3}>
                                    <Grid item md={6}>
                                        <Textfield
                                            required
                                            name="nom"
                                            label="Nom"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Textfield
                                            required
                                            label="Prénom"
                                            name="prenom"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Textfield
                                            required
                                            label="Email"
                                            name="email"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Textfield
                                            required
                                            label="UserName"
                                            name="userName"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Textfield
                                            required
                                            label="mot de passe"
                                            name="passWord"
                                            color="secondary"
                                            type="password"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Textfield
                                            required
                                            label="confirmer le mot de passe"
                                            name="passWordConfirm"
                                            color="secondary"
                                            type="password"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Select
                                            name="civility"
                                            label="Civility"
                                            options={Civility}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <DateTimePicker
                                            name="birthDate"
                                            label="BirthDate"
                                        />
                                    </Grid>
                                    <Grid item md={6}> <Textfield
                                        required
                                        label="Numéro Téléphone"
                                        name="numMobile"
                                        color="secondary"
                                    /></Grid>
                                    <Grid item md={3}> <Textfield
                                        required
                                        label="Code Postale"
                                        name="codePostale"
                                        color="secondary"
                                    /></Grid>
                                    <Grid item md={3}> <Select
                                        name="gouvernorats"
                                        label="Civility"
                                        options={Gouvernorats}
                                    />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Textfield
                                            required
                                            label="Adresse"
                                            name="adresse"
                                            color="secondary"
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>


                                    <Grid item md={12}>
                                        <Button color="secondary" fullWidth>
                                            Enregistrer
                                        </Button>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Grid>

                                </Grid>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </Grid>
        </Grid>
    );
}