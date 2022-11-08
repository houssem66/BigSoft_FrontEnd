import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { Button, useAsyncList } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Table } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import authService from "../../../Services/AuthServices";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProduitService from '../../../Services/Stock/ProduitService'
import UnitOfMeasure from '../../../Data/UnitOfMeasure.json'
import category from '../../../Data/Category.json'
function Index() {
    let navig = useNavigate();
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [Fetch, setFetch] = useState(true);
    const [name, setName] = useState('');
    const [Category, setCategory] = useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
        console.log(event.target.value,"category")
      };

    const handleClickOpen = () => {
        setOpen(true);
    };
    let unit = Object.values(UnitOfMeasure)
    let cat = Object.values(category)
    const handleClose = () => {
        setOpen(false);
    };
    //fetch data Produit
    useEffect(() => {
        if (Fetch) {
            let params = { include: "StockProduit,DetailsFactures.FactureFournisseur,DetailsFactureClients.FactureClient" }
            ProduitService.GetList(params).then(
                (res) => {

                    setList(res.data);
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
    //Handles
    const handleEdit = (item) => {

        navig('/feed/produit_edit/', { state: { produit: item } });

    }; const handleDetails = (item) => {

        navig('/feed/produit_details/', { state: { produit: item } });

    };
    const handleDelete = async (id) => {
        await ProduitService.Delete(id).then((res) => { });
        setFetch(true)
        setOpen(false);
    };
    async function sort({ items, sortDescriptor }) {
        if (sortDescriptor.direction === "descending") {
            switch (sortDescriptor.column) {

                case ".0.2":
                    setList(list.sort((a, b) => {

                        return a.priceHt - b.priceHt
                    }))
                    break;
                case ".0.3": setList(list.sort((a, b) => {

                    return a.priceTTc - b.priceTTc
                }))
                    break;

                default:
            }

        }
        else {
            switch (sortDescriptor.column) {
                case ".0.2": setList(list.sort((a, b) => {

                    return b.priceHt - a.priceHt
                }))
                    break;
                case ".0.3": setList(list.sort((a, b) => {

                    return b.priceTTc - a.priceTTc
                }))
                    break;
                default:
                    break;
            }
            //  filteredList.sort((a, b) => { return b.prixTotaleTTc - a.prixTotaleTTc })

        }


    }
    const listSort = useAsyncList({ sort });
    let filteredList = list.filter((item)=>{

        if (name!==''){
            return item.productName.toLowerCase().includes(name.toLowerCase())
        }
        else return item
    })
    .filter((item)=>{

        if (Category!==''){
            return item.category.toString().includes(Category.toString())          }
        else {return item}
    });
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
                <Grid item md={8}>
                    <Input
                        clearable
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
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
                        aria-label="Example pagination  table"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                        sortDescriptor={listSort.sortDescriptor}
                        onSortChange={listSort.sort}
                    >
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column>productName</Table.Column>
                            <Table.Column allowsSorting>priceHT</Table.Column>
                            <Table.Column allowsSorting>priceTTc</Table.Column>
                            <Table.Column>category</Table.Column>
                            <Table.Column>TVA</Table.Column>
                            <Table.Column>Unité de mésure</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredList.map(item => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.productName}</Table.Cell>
                                    <Table.Cell>{item.priceHt}</Table.Cell>
                                    <Table.Cell>{item.priceTTc}</Table.Cell>
                                    <Table.Cell>{cat[item.category]}</Table.Cell>
                                    <Table.Cell>{item.tva}%</Table.Cell>
                                    <Table.Cell>{unit[item.unitOfMeasure]}</Table.Cell>
                                    <Table.Cell>
                                        <IconButton onClick={handleClickOpen} color="primary" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { handleEdit(item) }} color="error" aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { handleDetails(item) }} color="default" aria-label="Edit">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <div>

                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Confirmer le suppression"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description"><p>  Vous allez supprimer le produit    <Typography component="h1" variant="h5">{item.productName}</Typography> !!</p>


                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button color="gradient" onClick={handleClose} auto>Annuler</Button>
                                                    <Button color="warning" onClick={() => {

                                                        handleDelete(item.id);

                                                    }} autoFocus>
                                                        Supprimer
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Table.Cell>

                                </Table.Row>))}


                        </Table.Body>
                       
                    </Table>
                </Grid>
            </Grid></Box>
    )
}

export default Index