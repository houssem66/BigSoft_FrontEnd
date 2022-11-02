import React from 'react'
import { Grid, Paper, createTheme, ThemeProvider, Typography, Link } from '@mui/material'
import { Input, Table } from '@nextui-org/react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import { useEffect } from 'react';

const theme = createTheme({
  typography: {
    button: {
      color: "#808080"
    }, body1: {
      fontWeight: "600",
      color: "blueviolet"
    },
  },
});
function Stock({ Produit }) {
  let navig=useNavigate()
  
  return (
    <>{(Produit) ?
      (
        <ThemeProvider theme={theme}>


          <Box sx={{
            my: 4,
            mx: 2,
           
          }}>
            <Table
              bordered
              shadow={false}
              color="secondary"
              aria-label="Example pagination  table"
              css={{
                height: "auto",
                minWidth: "100%",
                fontSize: "25px"
              }}

            >
              <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Quantite</Table.Column>
                <Table.Column>priceHT</Table.Column>
                <Table.Column>priceTTc</Table.Column>
                <Table.Column>TypeTransactions</Table.Column>
                <Table.Column>Voir Facture</Table.Column>
               

              </Table.Header>
              <Table.Body>
                {Produit.detailsFactures.map(item => (
                        <Table.Row css={{backgroundColor:"$green300"}} key={item.id}>
                            <Table.Cell>{item.factureFournisseur.date.toString().substring(0,10)}</Table.Cell>
                            <Table.Cell>{item.quantite}</Table.Cell>
                            <Table.Cell>{item.montantHt}</Table.Cell>
                            <Table.Cell>{item.montantTTc}</Table.Cell>
                            <Table.Cell>Achat</Table.Cell>
                            <Table.Cell><Link onClick={(event, value) => {
                                        event.preventDefault();
                                       
                                        navig('/feed/factureFournisseur_details/', { state: { Facture: item.factureFournisseur.id } });


                                    }}
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        href="/"
                                    >
                                        <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Voir 
                                    </Link></Table.Cell>
                         
                         

                        </Table.Row>))}
                        {Produit.detailsFactureClients.map(item => (
                        <Table.Row css={{backgroundColor:"$red300"}} key={item.id}>
                            <Table.Cell>{item.factureClient.date.toString().substring(0,10)}</Table.Cell>
                            <Table.Cell>{item.quantite}</Table.Cell>
                            <Table.Cell>{item.montantHt}</Table.Cell>
                            <Table.Cell>{item.montantTTc}</Table.Cell>
                            <Table.Cell>Vente</Table.Cell>
                            <Table.Cell><Link onClick={(event, value) => {
                                        event.preventDefault();
                                      
                                        navig('/feed/factureClient_details/', { state: { Facture: item.factureClient.id } });


                                    }}
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        href="/"
                                    >
                                        <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Voir 
                                    </Link></Table.Cell>
                         
                         

                        </Table.Row>))}

              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={10}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Box>


        </ThemeProvider>
      )
      : (<div>not ok</div>)}</>
  )
}

export default Stock