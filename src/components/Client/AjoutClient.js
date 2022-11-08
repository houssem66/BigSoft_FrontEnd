
import { Grid } from "@mui/material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import clientService from '../../Services/ClientService';
import Select from '../FormsUI/Select'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Textfield from '../FormsUI/Textfields'
import DateTimePicker from '../FormsUI/DataTimePicker'
import Civility from '../../Data/Civility.json'
import TypeClient from '../../Data/TypeClient.json'
import Gouvernorats from '../../Data/Gouvernorats.json'
import Button from '../FormsUI/Button'
import { Button as Butt } from '@mui/material';

function Ajout() {
    const INITIAL_FORM_STATE = {
        nom: '',
        prenom: '',
        codePostale: '',
        birthDate: '',
        email: '',
        phoneBureau: '',
        numMobile: '',
        adresse: '',
        civility: '',
        gouvernorats: '',
        typeClient: '',
        cin: '',
        identifiant_fiscale: '',
    };
   
    const [type, setTypeCLient] = React.useState('');


    // Grab values and submitForm from context

    const AutoSubmitToken = () => {
        const { values, submitForm } = useFormikContext();

        React.useEffect(() => {

            if (values.typeClient != null) {
                setTypeCLient(values.typeClient);


            }

        });
    };





    let navigate = useNavigate();
    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email('Invalid email.').required('required'),
        nom: Yup.string().required('required'),
        prenom: Yup.string().required('required'),
        codePostale: Yup.string().length(4)
            .matches(/^([0-9]+)$/, "must be a number").required('Required'),
        phoneBureau: Yup.string().required("required").length(8).matches(/^([0-9]+)$/, "must be a number"),
        numMobile: Yup.string().required("required").length(8).matches(/^([0-9]+)$/, "must be a number"),
        adresse: Yup.string().required('required'),
        civility: Yup.string()
            .required('Required'),
        gouvernorats: Yup.string()
            .required('Required'),
        typeClient: Yup.string().required("required"),
        cin: Yup.string().when("typeClient", {
            is: "0",
            then: Yup.string().required("required").length(8).matches(/^([0-9]+)$/, "must be a number")
        }),
        identifiant_fiscale: Yup.string().when("typeClient", {
            is: "1",
            then: Yup.string().required("required").matches(/^[0-9]{8}[A-Za-z]$/, "Must be a In this format 12345678X.")
        }),
        birthDate: Yup.date().required("required"),

    });

    const annuler = (e) => {
        navigate("/feed/client");

    }
    const handlesubmit = async (client) => {


        try {
            await clientService.ajout(client).then(
                (response) => {

                    navigate("/feed/client");
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
    function getProper() {


        switch (type) {
            case "0":
                return <Textfield
                    name="cin"
                    label="Cin"
                />;

            case "1":
                return <Textfield
                    name="identifiant_fiscale"
                    label="Fiscale Fiscale"
                />;
          
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
                <AutoSubmitToken />
                <Grid container component="main" sx={{ mx: 3, my: 2, maxWidth: "90%" }} direction="row" spacing={4} alignItems="flex-start" justifyContent="space-between"  >
                    <Grid md={12} item>
                        <Typography component="h1" variant="h5">
                            Add a client
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                     General informations:
                                </Typography>
                            </Grid>

                            <Grid md={6} item>
                                <Textfield
                                    name="nom"
                                    label="Name"
                                />
                            </Grid>
                            <Grid md={6} item >
                                <Textfield
                                    name="prenom"
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent="flex-start" spacing={4}
                                    alignItems="flex-start">

                                    <Grid item md={6} >
                                        <Textfield
                                            name="email"
                                            label="Email"
                                        />
                                    </Grid>
                                    <Grid item md={4} >
                                        <DateTimePicker
                                            name="birthDate"
                                            label="BirthDate"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={6} >
                                <Textfield
                                    name="numMobile"
                                    label="Mobile phone number"
                                />
                            </Grid> <Grid item md={6} >
                                <Textfield
                                    name="phoneBureau"
                                    label="office phone number"
                                />
                            </Grid>
                            

                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    monitary informations:
                                </Typography>
                            </Grid>

                            <Grid md={6} item>
                                <Select
                                    name="typeClient"
                                    label="client type"
                                    options={TypeClient}
                                />
                            </Grid>
                            <Grid md={6} item >
                                {getProper()}
                            </Grid>
                            <Grid item md={4} >
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
                                    Adress :
                                </Typography>
                            </Grid>
                            <Grid item md={2} >
                                <Textfield
                                    name="codePostale"
                                    label="Zip Code"
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
                                <Butt variant='contained' color="error" onClick={() => { annuler() }} >
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

export default Ajout