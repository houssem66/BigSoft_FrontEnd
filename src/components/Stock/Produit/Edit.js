import React from 'react'
import { Alert, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import ProduitService from '../../../Services/Stock/ProduitService';
import Select from '../../FormsUI/Select'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../FormsUI/Textfields'
import DateTimePicker from '../../FormsUI/DataTimePicker'
import Button from '../../FormsUI/Button'
import { Button as Butt } from '@mui/material';
import TVAList from '../../../Data/TVA.json'
import UnitOfMeasure from '../../../Data/UnitOfMeasure.json'
import Category from '../../../Data/Category.json'
function Edit() {
  let location = useLocation();
  console.log(location.state.produit)
  const [PrixHT, setPrixHt] = React.useState('');
  const [TVA, setTVA] = React.useState('');

  const INITIAL_FORM_STATE = {
    id: location.state.produit.id,
    productName: location.state.produit.productName,
    barcode: location.state.produit.barcode,
    description: location.state.produit.description,
    priceHT: location.state.produit.priceHt,
    tva: location.state.produit.tva,
    category: location.state.produit.category,
    unitOfMeasure: location.state.produit.unitOfMeasure,

  };
  const FORM_VALIDATION = Yup.object().shape({
    productName: Yup.string().required('required'),
    barcode: Yup.string().required('required'),
    description: Yup.string().required('required'),
    priceHT: Yup.number().required('required'),
    tva: Yup.string()
      .required('Required'),
    unitOfMeasure: Yup.string().required("required"),
    category: Yup.string().required("required"),


  });



  // Grab values and submitForm from context

  const AutoSubmitToken = () => {
    const { values, submitForm } = useFormikContext();

    React.useEffect(() => {

      if (values.priceHT != null) {
        setPrixHt(values.priceHT);
        setTVA(values.tva)

      }

    });
  };

  let navigate = useNavigate();


  const annuler = (e) => {
    navigate("/feed/produit");

  }
  function CalculatePrixTTC() {
    console.log(TVA, "TVA")
    console.log(PrixHT, "PrixHT")
    if (PrixHT > 0) {
      if (TVA > 0) {
        let x = (parseFloat(TVA) / 100) * parseFloat(PrixHT) + parseFloat(PrixHT)
        console.log(x)
        return x
      }
      else if (TVA == 0) {
        let x = parseFloat(PrixHT)
        console.log(x)
        return x
      }

    }
    return 0
  }
  const handlesubmit = async (client) => {


    try {
      await ProduitService.Put(client).then(
        (response) => {

          navigate("/feed/produit");
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
        <AutoSubmitToken />
        <Grid container component="main" sx={{ mx: 3, my: 2, maxWidth: "90%" }} direction="row" spacing={4} alignItems="flex-start" justifyContent="space-between"  >
          <Grid md={12} item>
            <Typography component="h1" variant="h5">
              Ajouter un Produit
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  informations Générale:
                </Typography>
              </Grid>

              <Grid md={6} item>
                <Textfield
                  name="productName"
                  label="Nom de produit"
                />
              </Grid>
              <Grid md={6} item >
                <Textfield
                  name="barcode"
                  label="Code a barre"
                />
              </Grid>
              <Grid item md={12}>
                <Grid container justifyContent="flex-start" spacing={4}
                  alignItems="flex-start">

                  <Grid item md={6} >
                    <Textfield
                      name="description"
                      label="Description"
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item md={4} >
                    <Select
                      name="category"
                      label="catégorie"
                      options={Category}
                    />
                  </Grid>
                </Grid>
              </Grid>




            </Grid>
          </Grid>

          <Grid item md={12}>
            <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container  >
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  Informatino Monitaire :
                </Typography>
              </Grid>
              <Grid item md={2} >
                <Textfield
                  name="priceHT"
                  label="Prix hors tax"
                />
              </Grid>
              <Grid item md={3} >
                <Select
                  name="tva"
                  label="TVA"
                  options={TVAList}
                />
              </Grid>
              <Grid item md={2} >
                <Select
                  name="unitOfMeasure"
                  label="Unité de mesure"
                  options={UnitOfMeasure}
                />
              </Grid>
              <Grid item md={5} >
                <Alert severity="success">prix TTC: <strong>{(CalculatePrixTTC() < 1) ? (<div></div>) : (CalculatePrixTTC())}</strong> </Alert>
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

export default Edit