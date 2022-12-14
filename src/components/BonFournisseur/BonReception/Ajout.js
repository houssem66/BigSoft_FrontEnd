import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useEffect } from "react";
import { useState } from "react";
import authService from "../../../Services/AuthServices";
import TableC from './Table';
import GrossisteService from '../../../Services/UserService'


function Ajout({ title,selector, listFournisseur, SetDetailsBonReceptionModels, detailsBonReceptionModels, Fournisseur, setFournisseur, handleSubmit ,client}) {

  const [Grossiste, setGrossiste] = useState('');

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
                <strong style={{ color: "black" }}> </strong>
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
       
      </Grid>
      <Grid sx={{ mt: 10, ml: 5, mx: 2 }} container spacing={5}>
        <TableC client={client} detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} ></TableC>
      </Grid>
      <Grid sx={{ mt: 5, ml: 5, mx: 2 }} justifyContent="center" container spacing={5}>
        <Grid md={5} item><Button variant="contained" color="success" onClick={(e) => { handleSubmit(e) }} fullWidth>Confirm</Button></Grid>

      </Grid>
    </Box>
  )
}

export default Ajout