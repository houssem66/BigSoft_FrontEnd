import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { Button, useAsyncList } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Table } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bonLivraisonService from '../../../Services/BonClient/BonLivraisonService';
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
import ConfirmationMenu from "./ConfirmationMenu";
import TypeClient from '../../../Data/TypeClient.json'

function Index({ iDC }) {
    let navig = useNavigate();
    let type = Object.values(TypeClient)

    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [Fetch, setFetch] = useState(true);
    const [name, setName] = useState('');
    const [Category, setCategory] = useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //fetch data fournisseur
    useEffect(() => {
        if (Fetch) {
            setFetch(false)
            let params = { include: "Client,FactureClient" }
            params.iDC = (iDC) ? (iDC) : (0)
            bonLivraisonService.GetList(params).then(
                (res) => {
                    setList(res.data);
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

        navig('/feed/deliveryOrder_edit/', { state: { Bon: item.id } });

    };
    const handleDetails = (item) => {

        navig('/feed/deliveryOrder_details/', { state: { Bon: item.id } });

    };
    const handleDelete = async (id) => {

        await bonLivraisonService.Delete(id).then((res) => { });
        setFetch(true)
        setOpen(false);
    };
    async function sort({ items, sortDescriptor }) {
        if (sortDescriptor.direction === "descending") {
            switch (sortDescriptor.column) {

                case ".0.5":
                    setList(list.sort((a, b) => {

                        return a.prixTotaleHt - b.prixTotaleHt
                    }))
                    break;
                case ".0.6": setList(list.sort((a, b) => {

                    return a.prixTotaleTTc - b.prixTotaleTTc
                }))
                    break;

                default:
            }

        }
        else {
            switch (sortDescriptor.column) {
                case ".0.5": setList(list.sort((a, b) => {

                    return b.prixTotaleHt - a.prixTotaleHt
                }))
                    break;
                case ".0.6": setList(list.sort((a, b) => {

                    return b.prixTotaleTTc - a.prixTotaleTTc
                }))
                    break;
                default:
                    break;
            }
            //  filteredList.sort((a, b) => { return b.prixTotaleTTc - a.prixTotaleTTc })

        }


    }
    let filteredList = list.filter((item) => {

        if (name !== '') {
            return item.client.raisonSocial.toLowerCase().includes(name.toLowerCase())
                || item.client.email.toLowerCase().includes(name.toLowerCase())
        }
        else return item
    }).filter((item) => {
        if (Category !== '') {
            if (Category) {
                return item.confirmed
            }
            else return !(item.confirmed)

        }

        return item
    })
    const listSort = useAsyncList({ sort });

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
                <Grid item md={2}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Category}
                        sx={{ fontSize: "15px" }}
                        label="Confirmation"
                        onChange={handleChange}
                        fullWidth
                        defaultValue="Tous"

                    >
                        <MenuItem sx={{ fontSize: "15px" }} value={''}>All</MenuItem>
                        <MenuItem sx={{ fontSize: "15px" }} value={true}>Confirmed</MenuItem>
                        <MenuItem sx={{ fontSize: "15px" }} value={false}>Not confirmed</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={2}>
                    <Button css={{ width: "100%" }} flat color="success" onClick={event => { navig("/feed/deliveryOrder_add"); }} auto icon={<AddIcon />}>Add</Button></Grid>
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
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Vendor corporate name</Table.Column>
                            <Table.Column>vendor Email</Table.Column>
                            <Table.Column>Office phone number</Table.Column>
                            <Table.Column>vendor website</Table.Column>
                            <Table.Column allowsSorting>Total price  HT</Table.Column>
                            <Table.Column allowsSorting>Total Price TTC</Table.Column>
                            <Table.Column>Confirmation</Table.Column>
                            <Table.Column></Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {(list) ? (filteredList.map(item => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.date.toString().substring(0, 10)}</Table.Cell>
                                    <Table.Cell>{item.client.raisonSocial}</Table.Cell>
                                    <Table.Cell>{item.client.email}</Table.Cell>
                                    <Table.Cell>{item.client.numMobile}</Table.Cell>
                                    <Table.Cell>{type[item.client.typeClient]}</Table.Cell>

                                    <Table.Cell><strong>{item.prixTotaleHt}</strong></Table.Cell>
                                    <Table.Cell><strong>{item.prixTotaleTTc}</strong></Table.Cell>
                                    <Table.Cell>{(item.confirmed) ? (<ConfirmationMenu item={item.factureClient} color="success" />)
                                        : (<ConfirmationMenu id={item.id} color="error" />)}</Table.Cell>
                                    <Table.Cell>
                                        <IconButton onClick={handleClickOpen} color="primary" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        {(item.confirmed) ? (<IconButton disabled onClick={() => { handleEdit(item) }} color="error" aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>) : (<IconButton onClick={() => { handleEdit(item) }} color="error" aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>)}

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
                                                    <DialogContentText id="alert-dialog-description"><p>  Vous allez supprimer le fournisseur    <Typography component="h1" variant="h5">{item.raisonSocial}</Typography> !!</p>


                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button color="gradient" onClick={handleClose} auto>fermer</Button>
                                                    <Button color="warning" onClick={() => {

                                                        handleDelete(item.id);

                                                    }} autoFocus>
                                                        supprimer
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Table.Cell>

                                </Table.Row>))) : (
                                <Table.Row >
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>
                                    <Table.Cell>empty</Table.Cell>


                                </Table.Row>
                            )}


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
            </Grid></Box >
    )
}

export default Index