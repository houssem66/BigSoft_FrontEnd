import React from "react"; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link, useNavigate, Outlet } from "react-router-dom";
const ListItems = () => {
  const [open, setOpen] = React.useState(false);
const handleClick = () => {
    setOpen(!open);
  }; 
  const [open2, setOpen2] = React.useState(false);
const handleClick2 = () => {
    setOpen2(!open2);
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
          <ListItemText onClick={event=>{navig("/feed/stock");}} primary="Bon de Commande" />
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
          <ListItemText onClick={event=>{navig("/feed/produit");}} primary="Facture" />
        </ListItemButton>
      </List>
    </Collapse> 
    
    </React.Fragment>);
}

export default ListItems;


