import { Box, Grid, Stack, Typography, createTheme, ThemeProvider, Tabs, Tab, Button } from '@mui/material'
import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import Infromation from './Infromation';
import { useLocation, useNavigate } from 'react-router-dom';
import Stock from './Stock';
const theme = createTheme({
  typography: {
    h4: {
      color: "blueviolet",

    },
  },
});
function Details() {
  let location = useLocation();
  let navigate = useNavigate()
  const [tab, setValue] = useState(0)
  const handleChange = (event, value) => {
    console.log(value)
    setValue(value)

  }
  function getProper() {
 
    switch (tab) {
     
      case 0: return <Infromation Produit={location.state.produit} />
      case 1: return <Stock Produit={location.state.produit} />
      default: return <Infromation Produit={location.state.produit} />
    }
  }
  return (<>
    <ThemeProvider theme={theme}>
    <Box
        sx={{
          my: 8,
          mx: 4,
        
          height: "100vh"
        }}
      >
        <Grid container spacing={30} direction="row" justifyContent="space-between" alignItems="flex-end">
          <Grid item md={3}><Typography variant="h4" gutterBottom>
           {location.state.produit.productName}
          </Typography></Grid>
          <Grid item>

          </Grid>
          <Grid item md={2}> <Typography variant="body1" gutterBottom>
            En stock
            <strong style={{ color: "blue" }}> {(location.state.produit.stockProduit[0])?(location.state.produit.stockProduit[0].quantite):(0) }</strong>
          </Typography>
            <Button variant="contained" color="secondary" onClick={() => {
              navigate('/feed/produit_edit/', { state: { produit: location.state.produit } });
            }} startIcon={<CreateIcon />}>Edit</Button>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4, mx: -1 }}>
          <Grid item md={12}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              <Tab icon={<InfoIcon />} iconPosition="end" label={"Information"} />
              <Tab icon={<InventoryIcon />} iconPosition="end" label={"Stock"} />

            </Tabs>
          </Grid>
          <Grid item md={12}>
            {getProper()}
          </Grid>
        </Grid>


      </Box>
    </ThemeProvider>
  </>


  )
}

export default Details