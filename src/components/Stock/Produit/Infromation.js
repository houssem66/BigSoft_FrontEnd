import { Grid, Paper, createTheme, ThemeProvider, Typography } from '@mui/material'
import UnitOfMeasure from '../../../Data/UnitOfMeasure.json'
import Category from '../../../Data/Category.json'
import React from 'react'
import { useState } from 'react';
const theme = createTheme({
    typography: {
        button: {
            color: "#808080"
        }, body1: {
            fontWeight: "600",
            color:"blueviolet"
        },
    },
});
function Infromation(props) {
    const [produit,SetProduit]=useState(props.Produit)
    let unit=Object.values(UnitOfMeasure)
    let cat=Object.values(Category)
    return (
        <>{(props.Produit!=null)?(  <ThemeProvider theme={theme}>
                
            <Paper sx={{height:"100%"}} elevation={3} >
            <Grid container  sx={{ my: 5 }}>
                <Grid item md={3} sx={{ ml: 2 }}>
                    <Typography variant='button'>Categoryie</Typography>
                    <Typography variant='body1'>{cat[produit.category]}</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography variant='button'>Unité de mesure</Typography>
                    <Typography variant='body1'>{unit[produit.unitOfMeasure]}</Typography>
                </Grid>

                <Grid item md={4}>
                    <Typography variant='button'>Description</Typography>
                    <Typography variant="body2" gutterBottom>
                       {produit.description}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ ml: 2, mt: 8 }}>
                    <Grid container direction="column"  justifyContent="space-around" alignItems="flex-start" >
                        <Grid md={4}>
                        <Typography variant='button'>Prix
                         </Typography>
                        </Grid>
                        <Grid md={4}sx={{mt:2}}>
                        <Typography variant='body1' >{produit.priceTTc} TND TTC</Typography>
                        </Grid>
                        <Grid md={4}sx={{mt:2}}>
                        <Typography variant='body1'>{produit.priceHt} TND HT</Typography></Grid>
                    </Grid>
                </Grid>  
                 <Grid item md={4} sx={{ ml: 2, mt: 8 }}>
                    <Grid container direction="column"  justifyContent="space-around" alignItems="flex-start" >
                        <Grid md={4}>
                        <Typography variant='button'>TVA
                         </Typography>
                        </Grid>
                        <Grid md={4} sx={{mt:2}}>
                        <Typography variant='body1'>{produit.tva}%</Typography>
                        </Grid>
                        
                    </Grid>
                </Grid>  
                <Grid item md={3} sx={{ ml: 2, mt: 8 }}>
                    <Grid container direction="column"  justifyContent="space-around" alignItems="flex-start" >
                        <Grid md={4}>
                        <Typography variant='button'>Valeur unitaire en stock
                         </Typography>
                        </Grid>
                        <Grid md={4}sx={{mt:2}}>
                        <Typography variant='body1'>{( produit.stockProduit[0])?(produit.stockProduit[0].prixTotaleTTc):(0) } TND</Typography>
                        </Grid>
                       
                    </Grid>
                </Grid>


            </Grid></Paper>
        </ThemeProvider>):(<div></div>)}
          

        </>

    )
}

export default Infromation