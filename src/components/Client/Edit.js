
import { Grid } from "@mui/material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import clientService from '../../Services/ClientService';
import Select from '../FormsUI/Select'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext, useFormik } from 'formik';
import * as Yup from 'yup';
import Textfield from '../FormsUI/Textfields'
import DateTimePicker from '../FormsUI/DataTimePicker'
import Civility from '../../Data/Civility.json'
import TypeClient from '../../Data/TypeClient.json'
import Gouvernorats from '../../Data/Gouvernorats.json'
import Button from '../FormsUI/Button'
import { Button as Butt } from '@mui/material';

function getProper(typ) {
  switch (typ) {
    case 0:
      return <Textfield
        name="cin"
        label="Cin"
      />;

    case 1:
      return <Textfield
        name="identifiant_fiscale"
        label="Identifiant Fiscale"
      />;
  }
}
function EditClient() {
  const [date,setDate]=React.useState('');
  const [client,setClient]=React.useState('');
  const location = useLocation();
  React.useEffect(() => {
    if (location.state.client) {

    
      const Date = location.state.client.birthDate.toString().substring(0, 10).split("-");
      setClient(location.state.client)
      setDate(Date[0] + "-" + Date[1] + '-' + Date[2])
      console.log(Date,"array")
      console.log("result",Date[2] + "-" + Date[1] + '-' + Date[0])
    }
  }, [location.state])  
  const INITIAL_FORM_STATE = (client)?( {
    id: client.id,
    nom: client.nom,
    prenom: client.prenom,
    codePostale: client.codePostale,
    birthDate: date,
    email: client.email,
    phoneBureau: client.phoneBureau,
    numMobile: client.numMobile,
    adresse: client.adresse,
    civility: client.civility,
    gouvernorats: client.gouvernorats,
    typeClient: client.typeClient,
    cin: client.cin,
    identifiant_fiscale: client.identifiant_fiscale,
  }):( {
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
  })
 
  const [type, setTypeCLient] = React.useState(1);


  // Grab values and submitForm from context

  const AutoSubmitToken = () => {
    const { values, submitForm } = useFormikContext();
    const typ = values.typeClient;
    React.useEffect(() => {

      if (values.typeClient != null) {
        setTypeCLient(values.typeClient);


      }

    }, [values.typeClient]);
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

    console.log(client.birthDate,"birthdate")
    // try {
    //   await clientService.Put(client).then(
    //     (response) => {

    //         navigate("/feed/client");
    //         window.location.reload();
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // } catch (err) {
    //   console.log(err);
    // }

  }

  return (
    <>{(client)?(  <Formik initialValues={{
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
              Edit the client:  <strong style={{color:"red",ml:4}}>{location.state.client.nom} </strong> 
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  Generale information
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
                  label="Last name"
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
                  Monitary information:
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
                {getProper(type)}

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
                  label="Zip code"
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
    </Formik>):(<div>empty</div>)}</>
  
  )
}

export default EditClient