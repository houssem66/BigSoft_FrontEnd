import { Autocomplete, Box, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../FormsUI/Textfields'
import { Alert, Grid } from "@mui/material";
import Category from '../../../Data/Category.json'
import Select from '../../FormsUI/Select'
import TVAList from '../../../Data/TVA.json'
import UnitOfMeasure from '../../../Data/UnitOfMeasure.json'
import Button from '../../FormsUI/Button'
import Auto from '../../FormsUI/AutoComplete'

const style = {
  position: 'absolute',
  top: '50%',
  left: '40%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
function Modale(props) {
  const INITIAL_FORM_STATE = {

    produit: '',
    quantite: ''

  };
  const FORM_VALIDATION = Yup.object().shape({
    produit: Yup.object("").nullable().required('required'),
    quantite: Yup.number("Doit etre un nombre").required('required'),



  });

  const handlesubmit = async (values) => {
    console.log("props" ,props.detailsBonReceptionModels)
    let ojb = { idProduit: values.produit.id, quantite: values.quantite }
    let DetailsBonReceptionModels = props.detailsBonReceptionModels;
    DetailsBonReceptionModels.push(ojb);
    props.SetDetailsBonReceptionModels(DetailsBonReceptionModels);
    const listDetails = props.ListDetails
    listDetails.push(values);
    props.SetListDetails(listDetails);
    const list = props.ListProduits
    props.SetListProduits(list.filter(item => item != values.produit))
    props.handleClose()
  }
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik initialValues={{
          ...INITIAL_FORM_STATE
        }}
          validationSchema={FORM_VALIDATION}
          onSubmit={values => {
            handlesubmit(values);
          }}

        >
          <Form>
            <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
              <Grid item md={12} >
                <Typography variant="button" display="block" gutterBottom>
                  informations Générale:
                </Typography>
              </Grid>

              <Grid md={4} item>
                <Auto
                  name="produit"
                  options={props.ListProduits}
                  optionName={"productName"}
                />
              </Grid>
              <Grid md={4} item >
                <Textfield
                  name="quantite"
                  label="quantite"


                />
              </Grid>
            </Grid>
            <Button >
              Enregistrer
            </Button>
          </Form>

        </Formik>
      </Box>
    </Modal>
  )
}

export default Modale