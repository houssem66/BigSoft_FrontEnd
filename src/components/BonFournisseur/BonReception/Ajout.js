import { Autocomplete, Button, Grid, List, Stack, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import authService from "../../../Services/AuthServices";
import TableC from './Table';
import FournisseurService from '../../../Services/FournisseurService'
import GrossisteService from '../../../Services/UserService'
import BonReceptionService from '../../../Services/BonFournisseur/BonReceptionService'


function Ajout({ selector, list }) {
  let navig = useNavigate();
  const [Grossiste, setGrossiste] = useState('');
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);

  const defaultProps = {
    options: list,
    getOptionLabel: (option) => option.raisonSocial,
  };
  useEffect(() => {

    const user = authService.getCurrentUser();

    GrossisteService.getUser(user.email).then((res) => {

      setGrossiste(res.data)
    })
  }, [])
  const handleSubmit = async () => {
    console.log("selector",selector)
    const user = authService.getCurrentUser();
    if (selector === "Fournisseur") {
      let aux = {
        fournisseurId: Fournisseur.id,
        grossisteId: user.id,
        date: new Date(),
        DetailsBonReceptionModels: detailsBonReceptionModels
      }

      try {
        await BonReceptionService.ajout(aux).then(
          (response) => {

            navig("/feed/bonReception");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("marray jay")
     }


  }

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

                <strong style={{ color: "blue" }}> Bon de réception</strong>
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
            Raison Sociale:  <strong>{Grossiste.raisonSocial}</strong>
          </Typography>




        </Grid>
        <Grid item md={3}>Adresse:<strong>{(Fournisseur) ? (Fournisseur.adresse) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Adresse: <strong>{Grossiste.adresse}</strong></Grid>
        <Grid item md={3}>Numéro Mobile:<strong>{(Fournisseur) ? (Fournisseur.numFax) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Numéro Mobile: <strong>{Grossiste.numMobile}</strong></Grid>
        <Grid item md={3}>Numéro Fix:<strong>{(Fournisseur) ? (Fournisseur.numbureau) : (<div></div>)} </strong></Grid>
        <Grid item md={6} ></Grid>
        <Grid item md={3}>Numéro Fix: <strong>{Grossiste.numbureau}</strong></Grid>

      </Grid>
      <Grid sx={{ mt: 10, ml: 5, mx: 2 }} container spacing={5}>
        <TableC detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} ></TableC>
      </Grid>
      <Grid sx={{ mt: 5, ml: 5, mx: 2 }} justifyContent="center" container spacing={5}>
        <Grid md={5} item><Button variant="contained" color="success" onClick={handleSubmit} fullWidth>Confirmer</Button></Grid>

      </Grid>
    </Box>
  )
}

export default Ajout