import { Grid, Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Table } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import fournisseurService from '../../Services/FournisseurService';
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

function BonReception() {
 

let navigate = useNavigate();

let navig = useNavigate();
const [list, setList] = useState([]);
const [open, setOpen] = useState(false);
const [Fetch, setFetch] = useState(true);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};
//fetch data fournisseur
useEffect(() => {
    if (Fetch){
        const user = authService.getCurrentUser();
        console.log(user.id)
        fournisseurService.GetList(user.id).then(
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
const handleEdit =  (item) => {

    navig('/feed/editFournisseur/',{state:{fournisseur:item}});

};
const handleDetails =  (item) => {

    navig('/feed/detailsFournisseur/',{state:{fournisseur:item}});

};
const handleDelete = async (id) => {
    await fournisseurService.Delete(id).then((res) => { });
    setFetch(true)
    setOpen(false);
};
  return (
    <div>BonReception</div>
  )
}

export default BonReception    