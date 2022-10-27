import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Container, Paper } from '@mui/material';
import { Formik, Form,   } from 'formik';
import Authenfication from './Authentification'
import InformationGenerale from './InformationGenerale'
import InformationPersonne from './InformationPersonne'
import validationSchema from './FormModel/validationSchema';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';
import CheckoutSucess from './CheckoutSucess/CheckoutSuccess'
import GrossisteServices from '../../Services/GrossisteServies'
import { useNavigate } from "react-router-dom";
const steps = ['authentification' , 'information genérale', 'information sur personne a contacter'];
const { formId, formField } = checkoutFormModel;
let formData = new FormData();

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Authenfication formField={formField} />;
    case 1:
      return <InformationGenerale formField={formField} />;
    case 2:
      return <InformationPersonne formField={formField} />;
  
    default:
      return <div>Not Found</div>;
  }
}

function Register() {
  let navigate =useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  const isLastStep = activeStep === steps.length - 1;
  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function _submitForm(values, actions) {
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
    formData.append('password', values.passWord);
    try {
      await GrossisteServices.signup(formData).then(
        (response) => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      
    }
  }
  function _handleSubmit(values, actions) {
    if (isLastStep) {

      console.log("ok")
      _submitForm(values, actions);
    } else {
     
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
    <Container container component="main" maxWidth="md" sx={{ mb: 4 }} >
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Register
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <CheckoutSucess />
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}validateOnChange={false}
              >
                {({ isSubmitting }) => (
                  <Form >
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button onClick={_handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"

                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1 ? 'Confirmer' : 'Next'}
                      </Button>
                      {isSubmitting && (
                        <CircularProgress
                          size={24}

                        />
                      )}
                    </Box>

                  </Form>
                )}
              </Formik>
            )}
          </React.Fragment>
        </React.Fragment>
      </Paper>
    </Container>
  )
}

export default Register