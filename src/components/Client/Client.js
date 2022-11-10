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
import clientService from '../../Services/ClientService'
import typeCLient from '../../Data/TypeClient.json'

function Client() {
    let navig = useNavigate();
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [Fetch, setFetch] = useState(true);
    const [name, setName] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let filteredList = list.filter((item) => {
        if (name != '') {
            return item.nom.toLowerCase().includes(name.toLowerCase())
                || item.prenom.toLowerCase().includes(name.toLowerCase())
                || item.email.toLowerCase().includes(name.toLowerCase())
        } return item
    });
    //fetch data fournisseur
    useEffect(() => {
        if (Fetch){
            clientService.GetList().then(
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
       
    },[Fetch]);
    //Handles
    const handleEdit = (item) => {

        navig('/feed/client_edit/', { state: { client: item } });

    }; const handleDetails = (item) => {

        navig('/feed/client_details/', { state: { client: item } });

    };
    const handleDelete = async (id) => {
        await clientService.Delete(id).then((res) => { });
        setFetch(true)
        setOpen(false);
    };
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
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
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
                    <Button css={{ width: "100%" }} flat color="success" onClick={event => { navig("/feed/client_add"); }} auto icon={<AddIcon />}>Add</Button></Grid>
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

                    >
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column>Name</Table.Column>
                            <Table.Column>Last Name</Table.Column>
                            <Table.Column>Birthday</Table.Column>
                            <Table.Column>Phone Number</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Client Type</Table.Column>
                            <Table.Column>Identifiant</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredList.map(item => (
                                console.log(item.typeClient!==0),
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.nom}</Table.Cell>
                                    <Table.Cell>{item.prenom}</Table.Cell>
                                    <Table.Cell>{item.birthDate.toString().substring(0,10)}</Table.Cell>
                                    <Table.Cell>{item.numMobile}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{(item.typeClient!==0)?(Object.values(typeCLient)[item.typeClient]+"(Fiscale)")
                                    :(Object.values(typeCLient)[item.typeClient]+"(cin)") }</Table.Cell>
                                    <Table.Cell>{(item.cin)?(item.cin):(item.identifiant_fiscale) }</Table.Cell>
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
                                                    <DialogContentText id="alert-dialog-description"><p>  You will delete the client    <Typography component="h1" variant="h5">{item.raisonSocial}</Typography> !!</p>


                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button color="gradient" onClick={handleClose} auto>Close</Button>
                                                    <Button color="warning" onClick={() => {

                                                        handleDelete(item.id);

                                                    }} autoFocus>
                                                        Delete
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Table.Cell>

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

export default Client