import { Grid, Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Table } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import authService from "../../Services/AuthServices";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StockService from '../../Services/Stock/StockService'
import UnitOfMeasure from '../../Data/UnitOfMeasure.json'
import Category from '../../Data/Category.json'
function Index() {
  let navig = useNavigate();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [Fetch, setFetch] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  let unit = Object.values(UnitOfMeasure)
  let cat = Object.values(Category)
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {

    if (Fetch) {
      let include = "StockProduit.Produit";
      StockService.GetList(include).then(
        (res) => {
          setList(res.data.stockProduit);
          setFetch(false)
        },
        (error) => {
          console.log("Private page", error.response);
          // Invalid token
          if (error.response && error.response.status === 403) {
            authService.logout();
            navig("/login");
            window.location.reload();
          }
        }
      );
    }

  }, [Fetch]);
  console.log("list", list)
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid sx={{ mt: 2, ml: 5, mx: 2 }} container spacing={5}>
        <Grid item md={10}>
          <Input
            clearable
            underlined
            color="success"
            labelPlaceholder="Search"
            width="100%"
            contentRight={
              <SearchIcon filled width="16" height="16" fill="#f5a623" />
            }
          />

        </Grid>
        <Grid item md={2}>
          <Button css={{ width: "100%" }} flat color="success" onClick={event => { navig("/feed/produit_ajout"); }} auto icon={<AddIcon />}>Ajouter</Button></Grid>
        <Grid item md={12}>
          <Table
            bordered
            shadow={false}
            color="secondary"
            lined={true}
          
            aria-label="Example pagination  table"
            css={{
              height: "auto",
              minWidth: "100%",
              border:"3",
             
            }}

          >
            <Table.Header>
              <Table.Column>productName</Table.Column>
              <Table.Column>Prix Unitaire Ht</Table.Column>
              <Table.Column>Prix Unitaire TTc</Table.Column>
              <Table.Column>category</Table.Column>
              <Table.Column>TVA</Table.Column>
              <Table.Column>Unité de mésure</Table.Column>
              <Table.Column>Quantite</Table.Column>
              <Table.Column>Prix Totale TTC</Table.Column>
              <Table.Column>Prix Totale HT</Table.Column>
            </Table.Header>
            <Table.Body>
              {list.map(item => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.produit.productName}</Table.Cell>
                            <Table.Cell>{item.produit.priceHt}</Table.Cell>
                            <Table.Cell>{item.produit.priceTTc}</Table.Cell>
                            <Table.Cell>{cat[item.produit.category]}</Table.Cell>
                            <Table.Cell>{item.produit.tva}%</Table.Cell>
                            <Table.Cell>{unit [item.produit.unitOfMeasure]}</Table.Cell>
                            <Table.Cell>{item.quantite}</Table.Cell>
                            <Table.Cell>{item.prixTotaleHt}</Table.Cell>
                            <Table.Cell>{item.prixTotaleTTc}</Table.Cell>
                         
                          

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
        </Grid>
      </Grid></Box>
  )
}

export default Index