import { createTheme, Grid, MenuItem, Paper, Select, ThemeProvider, Typography } from "@mui/material";
import { Button, useAsyncList } from "@nextui-org/react";
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
import category from '../../Data/Category.json'
const theme = createTheme({
  typography: {
    button: {
      color: "#808080"
    }, body1: {
      fontWeight: "600",
      fontSize: "24px",
      color: "blueviolet"
    },
  },
});
function Index() {
  let navig = useNavigate();
  const [store, setStore] = useState([]);
  const [name, setName] = useState('');
  const [aux, setAux] = useState([]);
  const [open, setOpen] = useState(false);
  const [Fetch, setFetch] = useState(true);
  const [Category, setCategory] = useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  let unit = Object.values(UnitOfMeasure)
  let cat = Object.values(category)
  const handleClose = () => {
    setOpen(false);
  };
  let filteredList = aux.filter((item) => {
    if (name !== '') {
   
      return item.produit.productName.toLowerCase().includes(name.toLowerCase())   
      
     
    }
    return item
  }).filter((item)=>{
    if (Category!=='')
    {
      
      return  item.produit.category === Category
    }
    return item;
  });
  useEffect(() => {

    if (Fetch) {
      let include = "StockProduit.Produit";
      StockService.GetList(include).then(
        (res) => {
          setStore(res.data);
          setAux(res.data.stockProduit)
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

  async function sort({ items, sortDescriptor }) {
    if (sortDescriptor.direction === "descending") {
      switch (sortDescriptor.column) {
        case ".0.1": setAux(aux.sort((a, b) => {

          return a.produit.priceHt - b.produit.priceHt
        }))
          break;
        case ".0.2":
          setAux(aux.sort((a, b) => {

            return a.produit.priceTTc - b.produit.priceTTc
          }))
          break;
        case ".0.6": setAux(aux.sort((a, b) => {

          return a.quantite - b.quantite
        }))
          break;
        case ".0.7": setAux(aux.sort((a, b) => {

          return a.prixTotaleHt - b.prixTotaleHt
        }))
          break;
        case ".0.8": setAux(aux.sort((a, b) => {

          return a.prixTotaleTTc - b.prixTotaleTTc
        }))
          break;
        default:
      }

    }
    else {
      switch (sortDescriptor.column) {
        case ".0.1": setAux(aux.sort((a, b) => {

          return b.produit.priceHt - a.produit.priceHt
        }))

          break;
        case ".0.2": setAux(aux.sort((a, b) => {

          return b.produit.priceTTc - a.produit.priceTTc
        }))
          break;
        case ".0.6": setAux(aux.sort((a, b) => {

          return b.quantite - a.quantite
        }))
          break;
        case ".0.7": setAux(aux.sort((a, b) => {

          return b.prixTotaleHt - a.prixTotaleHt
        }))
          break;
        case ".0.8": setAux(aux.sort((a, b) => {

          return b.prixTotaleTTc - a.prixTotaleTTc
        }))
          break;
        default:
          break;
      }
      //  filteredList.sort((a, b) => { return b.prixTotaleTTc - a.prixTotaleTTc })

    }


  }
  const list = useAsyncList({ sort });

  return (<>{(store.stockProduit) ? (<ThemeProvider theme={theme}>
    <Box
      sx={{

        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}
    >
      <Grid sx={{ ml: 5 }} container spacing={1}>
        <Grid md={3} item>
          <Typography variant='h5'>Information logistiques</Typography>
        </Grid>
        <Grid item md={9}></Grid>
        <Grid item md={3}><Typography variant='button'>Lieu de stockage</Typography></Grid>
        <Grid item md={3}>
          <Typography variant='button'>Valeur monitaire</Typography>
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={3}>
          <Typography variant='body1'>{(store.storeName) ? (store.storeName) : (<div>....</div>)}</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant='body1'>{(store.storeName) ? (store.sum + ' TND') : (<div>....</div>)}</Typography>
        </Grid>
        <Grid item md={6}>

        </Grid>
      </Grid>

      <Grid sx={{ mt: 2, ml: 5, mx: 2 }} container spacing={5}>
        <Grid item md={8}>
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value) }}
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
        <Grid item md={2} >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Category}
            sx={{ fontSize: "15px" }}
            label="Age"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem sx={{ fontSize: "15px" }} value={0}>Boissons</MenuItem>
            <MenuItem sx={{ fontSize: "15px" }} value={1}>Alimentaire</MenuItem>
          </Select>
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
              border: "3",

            }}
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
          >
            <Table.Header>
              <Table.Column>productName</Table.Column>
              <Table.Column allowsSorting>Prix Unitaire Ht</Table.Column>
              <Table.Column allowsSorting>Prix Unitaire TTc</Table.Column>
              <Table.Column>category</Table.Column>
              <Table.Column>TVA</Table.Column>
              <Table.Column >Unité de mésure</Table.Column>
              <Table.Column allowsSorting>Quantite</Table.Column>
              <Table.Column allowsSorting>Prix Totale TTC</Table.Column>
              <Table.Column allowsSorting>Prix Totale HT</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredList.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.produit.productName}</Table.Cell>
                  <Table.Cell>{item.produit.priceHt}</Table.Cell>
                  <Table.Cell>{item.produit.priceTTc}</Table.Cell>
                  <Table.Cell>{cat[item.produit.category]}</Table.Cell>
                  <Table.Cell>{item.produit.tva}%</Table.Cell>
                  <Table.Cell>{unit[item.produit.unitOfMeasure]}</Table.Cell>
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
      </Grid></Box></ThemeProvider>) : (<div>not ok</div>)}</>

  )
}

export default Index