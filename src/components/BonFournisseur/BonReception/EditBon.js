import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useEffect } from "react";
import { useState } from "react";
import authService from "../../../Services/AuthServices";
import TableC from './Table';
import GrossisteService from '../../../Services/UserService'
import React from 'react'

function EditBon({ selector, listFournisseur, SetDetailsBonReceptionModels, detailsBonReceptionModels, Fournisseur, setFournisseur, handleSubmit, bon, client,title }) {
  const [Grossiste, setGrossiste] = useState('');
  const [list,setList]=useState([])

  const defaultProps = {
    options: listFournisseur,
    getOptionLabel: (option) => option.raisonSocial,
  };
  useEffect(() => {

    const user = authService.getCurrentUser();

    GrossisteService.getUser(user.email).then((res) => {

      setGrossiste(res.data)
    })
  }, [])
  useEffect(()=>{
    if (bon){
      if (bon.detailsCommandes){
        setList(bon.detailsCommandes)
      }
      if (bon.detailsFactures){
        setList(bon.detailsFactures)
      }
      if (bon.detailsReceptions){
        setList(bon.detailsReceptions)
      }
     if (bon.detailsLivraisons){
      setList(bon.detailsLivraisons)
     }
     if (bon.detailsBonSorties)
     {
      setList(bon.detailsBonSorties)
     }
     if (bon.detailsDevis)
     {
      setList(bon.detailsDevis)
     }
    }
  
  
  },[bon])
  return (
    <Box
      sx={{
        my: 4,
        mx: 15,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        height: "100vh"
      }}
    >
      <Grid container direction="row" spacing={2} justifyContent="space-between" alignItems="flex-end">
        <Grid item md={3}>
          <Grid container >
            <Grid item >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                {...defaultProps}
                defaultValue={Fournisseur}
                sx={{ width: 300 }}
                onChange={(e, value) => { setFournisseur(value); }}
                renderInput={(params) => <TextField {...params} label={selector} />}
              />

            </Grid>
          </Grid>

        </Grid>
        <Grid item md={6}>
          <Grid container direction="row" justifyContent="center">
            <Grid item>
              <Typography variant="h4" gutterBottom>

                <strong style={{ color: "blue" }}> {title}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date:
                <strong style={{ color: "black" }}>{bon.date.toString().substring(0,10)} </strong>
              </Typography>
            </Grid>
          </Grid>

        </Grid>
        <Grid item md={3} >

          <Typography variant="body1" gutterBottom>
           Corporate name:  <strong>{Grossiste.raisonSocial}</strong>
          </Typography>




        </Grid>
        <Grid item md={3}>Adress:<strong>{(Fournisseur) ? (Fournisseur.adresse) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Adress: <strong>{Grossiste.adresse}</strong></Grid>
        <Grid item md={3}>Mobile phone number:<strong>{(Fournisseur) ? (Fournisseur.numFax) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Mobile phone number: <strong>{Grossiste.numMobile}</strong></Grid>
        <Grid item md={3}>Office phone number:<strong>{(Fournisseur) ? (Fournisseur.numbureau) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Office phone number: <strong>{Grossiste.numbureau}</strong></Grid>

      </Grid>
      <Grid sx={{ mt: 10, ml: 5, mx: 2 }} container spacing={5}>
        <TableC
          listDetailsProp={(bon) ? (list) : ([])}
          detailsBonReceptionModels={detailsBonReceptionModels}
          SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}  client={client}>
         
        </TableC>
      </Grid>
      <Grid sx={{ mt: 5, ml: 5, mx: 2 }} justifyContent="center" container spacing={5}>
        <Grid md={5} item><Button variant="contained" color="success" onClick={(e) => { handleSubmit(e) }} fullWidth>Confirm</Button></Grid>

      </Grid>
    </Box>
  )
}

export default EditBon