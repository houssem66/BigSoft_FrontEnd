import Box from '@mui/material/Box';
import { CssBaseline, Grid, Paper } from "@mui/material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import fournisseurService from '../../Services/FournisseurService';
import Select from '../FormsUI/Select'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../FormsUI/Textfields'
import Civility from '../../Data/Civility.json'
import Gouvernorats from '../../Data/Gouvernorats.json'
import Button from '../FormsUI/Button'
import { Button as Butt } from '@mui/material';
import FormeJuridique from '../../Data/FormeJuridique.json'

function EditFournisseur() {
    const location = useLocation();
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
        phoneBureau: Yup.
            string().required("required")
            .length(8).matches(/^([0-9]+)$/, "must be a number"),
        numMobile: Yup
            .string()
            .required("required")
            .length(8).matches(/^([0-9]+)$/, "must be a number"),
        adresse: Yup.string().required('required'),
        civility: Yup.string()
            .required('Required'),
        gouvernorats: Yup.string()
            .required('Required'),
        formeJuridique: Yup.string().required("required"),
        identifiant_fiscale: Yup
        .string()
        .required("required")
        .matches(/^[0-9]{8}[A-Za-z]$/, "Must be a In this format 12345678X.")

    });
    
    const INITIAL_FORM_STATE = {
      
        id: location.state.fournisseur.id,
        raisonSocial: location.state.fournisseur.raisonSocial,
        nomPersAContact: location.state.fournisseur.nomPersAContact,
        prenomPersAContact: location.state.fournisseur.prenomPersAContact,
        codePostale: location.state.fournisseur.codePostale,
        email: location.state.fournisseur.email,
        siteWeb: location.state.fournisseur.siteWeb,
        phoneBureau: location.state.fournisseur.phoneBureau,
        numMobile: location.state.fournisseur.numMobile,
        adresse: location.state.fournisseur.adresse,
        civility: location.state.fournisseur.civility,
        gouvernorats: location.state.fournisseur.gouvernorats,
        identifiant_fiscale: location.state.fournisseur.identifiant_fiscale,
        formeJuridique: location.state.fournisseur.formeJuridique
    };
    let navigate = useNavigate();

    const annuler = (e) => {
        navigate("/feed/vendor");

    }
    const handlesubmit = async (fournisseur) => {
      
        try {
            await fournisseurService.Put(fournisseur).then(
                (response) => {

                    navigate("/feed/vendor");
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
              //  const id = location.state.fournisseur.id;
               // const fournisseur = { id, values };
                handlesubmit(values);
            }}
        >
            <Form>
                <Grid container component="main" sx={{ mx: 3, my: 2, maxWidth: "90%" }} direction="row" spacing={4} alignItems="flex-start" justifyContent="space-between"  >
                    <Grid md={12} item>
                        <Typography component="h1" variant="h5">
                            Edit the vendor   <strong style={{color:"purple"}}> {location.state.fournisseur.raisonSocial}</strong>
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                  Corporate informations:
                                </Typography>
                            </Grid>

                            <Grid md={6} item>
                                <Textfield
                                    name="raisonSocial"
                                    label="Corporate Name"
                                />
                            </Grid>
                            <Grid md={6} item >
                                <Textfield
                                    name="siteWeb"
                                    label="WebSite"
                                />
                            </Grid>

                            <Grid item md={6} >
                                <Select
                                    name="formeJuridique"
                                    label="Legal status"
                                    options={FormeJuridique}
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="identifiant_fiscale"
                                    label="Fiscale Fiscale"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                person to contact :
                                </Typography>
                            </Grid>

                            <Grid item md={6} >
                                <Textfield
                                    name="nomPersAContact"
                                    label="Name "
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="prenomPersAContact"
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="numMobile"
                                    label="Mobile Number"
                                />
                            </Grid>
                            <Grid item md={6} >
                                <Textfield
                                    name="phoneBureau"
                                    label="Office Number"
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
                            <Grid item md={3}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container  >
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    Adress :
                                </Typography>
                            </Grid>
                            <Grid item md={2} >
                                <Textfield
                                    name="codePostale"
                                    label="Postal Code"
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
                                    label="Adress"
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
                                <Butt variant='outlined' color="error" onClick={() => { annuler() }} >
                                    Cancel
                                </Butt>
                            </Grid>
                            <Grid item >
                                <Button >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>


            </Form>
        </Formik>
    )
}

export default EditFournisseur;