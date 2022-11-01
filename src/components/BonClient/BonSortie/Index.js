import { Grid, Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Table } from '@nextui-org/react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BonCommandeService from '../../../Services/BonClient/BonSortieService';
import { useState } from "react";
import authService from "../../../Services/AuthServices";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TypeClient from '../../../Data/TypeClient.json'

function Index() {
  let navig = useNavigate();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [Fetch, setFetch] = useState(true);
  let type=Object.values(TypeClient)

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
          let params = { include: "Client.Grossiste,DetailsBonSorties.Produit" }
          BonCommandeService.GetList(params).then(
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
  const handleDelete = async (id) => {

      await BonCommandeService.Delete(id).then((res) => { });
      setFetch(true)
      setOpen(false);
  };
  const handleEdit = (item) => {

      navig('/feed/bonSortie_edit/', { state: { Bon: item } });

  };
  const handleDetails = (item) => {

      navig('/feed/bonSortie_details/', { state: { Bon: item } });

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
            <Button css={{ width: "100%" }} flat color="success" onClick={event => { navig("/feed/bonSortie_ajout"); }} auto icon={<AddIcon />}>Ajouter</Button>

        </Grid>

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
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Raison Sociale Client</Table.Column>
                    <Table.Column>Email Client</Table.Column>
                    <Table.Column>Numéro Mobile</Table.Column>
                    <Table.Column>Type Client</Table.Column>
                    <Table.Column>Prix Totale HT</Table.Column>
                    <Table.Column>Prix TTC</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body>
                    {list.map(item => (
                      
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.date.toString().substring(0, 10)}</Table.Cell>
                            <Table.Cell>{item.client.raisonSocial}</Table.Cell>
                            <Table.Cell>{item.client.email}</Table.Cell>
                            <Table.Cell>{item.client.numMobile}</Table.Cell>
                            <Table.Cell>{type[item.client.typeClient]}</Table.Cell>

                            <Table.Cell><strong>{item.prixTotaleHt}</strong></Table.Cell>
                            <Table.Cell><strong>{item.prixTotaleTTc}</strong></Table.Cell>


                            <Table.Cell>
                                <IconButton onClick={() => { handleEdit(item) }} color="error" aria-label="Edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleClickOpen} color="primary" aria-label="delete">
                                    <DeleteIcon />
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
                                            <DialogContentText id="alert-dialog-description"><p>  Vous allez supprimer le Bon de commande    <Typography component="h1" variant="h5">{item.raisonSocial}</Typography> !!</p>


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
    </Grid></Box >
  )
}

export default Index