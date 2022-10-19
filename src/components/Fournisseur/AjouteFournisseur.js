
import {  Grid  } from "@mui/material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import fournisseurService from '../../Services/FournisseurService';
import Select from '../FormsUI/Select'
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../FormsUI/Textfields'
import Civility from '../../Data/Civility.json'
import Gouvernorats from '../../Data/Gouvernorats.json'
import Button from '../FormsUI/Button'
import { Button as Butt } from '@mui/material';

function Ajout() {
    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email('Invalid email.').required('required'),
        raisonSocial: Yup.string().required('required'),
        nomPersAContact: Yup.string().required('required'),
        prenomPersAContact: Yup.string().required('required'),
        codePostale: Yup.string().length(4)
            .matches(/^([0-9]+)$/, "must be a number").required('Required'),
        siteWeb: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
            .required('Please enter website'),
        numbureau: Yup.number()
            .integer()
            .typeError('Please enter a valid phone number')
            .required('Required'),
        numFax: Yup.number()
            .integer()
            .typeError('Please enter a valid phone number')
            .required('Required'),
        adresse: Yup.string().required('required'),
        civility: Yup.string()
            .required('Required'),
        gouvernorats: Yup.string()
            .required('Required'),
          
          

    });
    console.log(Civility);
    const INITIAL_FORM_STATE = {

        raisonSocial: '',
        nomPersAContact: '',
        prenomPersAContact: '',
        codePostale: '',
        email: '',
        siteWeb: '',
        numbureau: '',
        numFax: '',
        adresse: '',
        civility: '',
        gouvernorats: '',
    };
    let navigate = useNavigate();

    const annuler = (e) => {
        navigate("/feed/fournisseur");

    }
    const handlesubmit = async (fournisseur) => {


        try {
            await fournisseurService.ajout(fournisseur).then(
                (response) => {

                    navigate("/feed/fournisseur");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <Formik initialValues={{
            ...INITIAL_FORM_STATE
        }}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                handlesubmit(values);
            }}
        >
            <Form>
                <Grid container component="main" sx={{ mx: 3, my: 2, maxWidth: "90%" }} direction="row" spacing={4} alignItems="flex-start" justifyContent="space-between"  >
                    <Grid md={12} item>
                        <Typography component="h1" variant="h5">
                            Ajouter un fournisseur
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    informations sur entreprise:
                                </Typography>
                            </Grid>

                            <Grid md={6} item>
                                <Textfield
                                    name="raisonSocial"
                                    label="Raison Sociale"
                                />
                            </Grid>
                            <Grid md={6} item >
                                <Textfield
                                    name="siteWeb"
                                    label="Site Web"
                                />
                            </Grid>

                            <Grid item md={6} >
                                <Textfield
                                    name="numFax"
                                    label="Numéro Fax"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    Peronne a contacter :
                                </Typography>
                            </Grid>

                            <Grid item md={6} >
                                <Textfield
                                    name="nomPersAContact"
                                    label="Nom "
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="prenomPersAContact"
                                    label="Prénom"
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="numbureau"
                                    label="Numéro de bureau"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Textfield
                                    name="email"
                                    label="Email"
                                />
                            </Grid>
                            <Grid item md={3} >
                                <Select
                                    name="civility"
                                    label="Civility"
                                    options={Civility}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container  >
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    Adresse :
                                </Typography>
                            </Grid>
                            <Grid item md={2} >
                                <Textfield
                                    name="codePostale"
                                    label="Code Postale"
                                />
                            </Grid>
                            <Grid item md={3} >
                                <Select
                                    name="gouvernorats"
                                    label="Gouvernorats"
                                    options={Gouvernorats}
                                />
                            </Grid>
                            <Grid item md={7} >
                                <Textfield
                                    name="adresse"
                                    label="Adresse"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid container
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Grid item >
                                <Butt variant='contained' color="error" onClick={() => { annuler() }} >
                                    annuler
                                </Butt>
                            </Grid>
                            <Grid item >
                                <Button >
                                    Enregistrer
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>


            </Form>
        </Formik>
    )
}

export default Ajout