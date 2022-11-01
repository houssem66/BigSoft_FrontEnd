import React from "react"; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import InventoryIcon from '@mui/icons-material/Inventory';
import {  useNavigate } from "react-router-dom";
const ListItems = () => {
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

const handleClick = () => {
    setOpen(!open);
  }; 
  const [open2, setOpen2] = React.useState(false);
const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  let navig=useNavigate();
  return (<React.Fragment>
    <ListItemButton onClick={event=>{navig("/feed");}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={event=>{navig("/feed/fournisseur");}}>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Fournisseur" />
    </ListItemButton >
    <ListItemButton onClick={event=>{navig("/feed/client");}} >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clients " />
    </ListItemButton>

    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Stock" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/stock");}} primary="Inventaire" />
        </ListItemButton> 
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/produit");}} primary="Produit" />
        </ListItemButton>
      </List>
    </Collapse> 
     <ListItemButton onClick={handleClick2}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion d'achat" />
      {open2 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open2} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/bonCommandeFournisseur");}} primary="Bon de Commande" />
        </ListItemButton> 
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/bonReception");}} primary="Bon de Reception" />
        </ListItemButton> 
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/factureFournisseur");}} primary="Facture" />
        </ListItemButton>
      </List>
    </Collapse> 
    <ListItemButton onClick={handleClick3}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion de vente" />
      {open2 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open3} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/bonCommandeClient");}} primary="Bon de Commande" />
        </ListItemButton> 
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/bonLivraison");}} primary="Bon de Livraison" />
        </ListItemButton> 
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/bonSortie");}} primary="Bon de sortie" />
        </ListItemButton>
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/devis");}} primary="Devis" />
        </ListItemButton>
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText onClick={event=>{navig("/feed/factureClient");}} primary="Facture" />
        </ListItemButton>
      </List>
    </Collapse> 
    </React.Fragment>);
}

export default ListItems;


