import {  Grid,  Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import TableC from './Table';

function DetailsBon({selector,bon,title}) {
    const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
    const [list,setList]=useState([])
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
  <>{(bon)?   
    (<Box
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
               {(selector.toLowerCase()=="client")?(bon.client.raisonSocial):(bon.fournisseur.raisonSocial)}
  
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
                  <strong style={{ color: "black" }}>  {bon.date.toString().substring(0,10)} </strong>
                </Typography>
              </Grid>
            </Grid>
  
          </Grid>
          <Grid item md={3} >
  
            <Typography variant="body1" gutterBottom>
              Raison Sociale:  <strong>{bon.grossiste.raisonSocial}</strong>
            </Typography>
  
  
  
  
          </Grid>
          <Grid item md={3}>Adresse:<strong>{(bon.fournisseur) ? (bon.fournisseur.adresse) : (bon.client.adresse)} </strong></Grid>
          <Grid item md={6} ></Grid>
          <Grid item md={3}>Adresse: <strong>{bon.grossiste.adresse}</strong></Grid>
          <Grid item md={3}>Numéro Mobile:<strong>{(bon.fournisseur) ? (bon.fournisseur.numFax) : (bon.client.numMobile)} </strong></Grid>
          <Grid item md={6} ></Grid>
          <Grid item md={3}>Numéro Mobile: <strong>{bon.grossiste.numMobile}</strong></Grid>
         
  
        </Grid>
        <Grid sx={{ mt: 10, ml: 5, mx: 2 }} container spacing={5}>
          <TableC listDetailsProp={list} detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}selector="ok" ></TableC>
        </Grid>
       
      </Box>  )
  
  
  :(<div>not ok</div>)}</>
  )
}

export default DetailsBon