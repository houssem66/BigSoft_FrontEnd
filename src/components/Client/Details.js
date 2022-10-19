import { Fade, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import GetAppIcon from '@mui/icons-material/GetApp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { useNavigate, Outlet } from "react-router-dom";
import Generale from "./Generale";
import Facture from "./Facture";
import Commande from "./Commande";
import BonReception from "./BonReception";
import Historique from "./Historique";
import DeleteIcon from '@mui/icons-material/Delete';
import TypeClient from '../../Data/TypeClient.json'
import Gouvernorats from '../../Data/Gouvernorats.json'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
const theme = createTheme({
  typography: {
    button: {
      color: "#808080"
    }, body1: {
      fontWeight: "600"
    },
  },
});

function DetailsClient() {
  const [value, setValue] = React.useState(0);
  const [navigator, setNavigator] = React.useState('Generale');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const [client, SetClient] = React.useState(location.state.client);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function getProper() {
    switch (navigator) {
      case "Generale": return <Generale />
      case "Commande": return <Commande />
      case "Historique": return <Historique />
      case "Bon": return <BonReception />
      case "Facture": return <Facture />
      default: return <Generale />
    }

  } function Proper() {

    if (client.typeClient === 0) {
      return <>
        <Grid item md={12}>
          <Typography variant="button" gutterBottom> Cin  </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="body1" gutterBottom> {client.cin}  </Typography>
        </Grid></>;
    }
    else {
      return <> <Grid item md={12}>
        <Typography variant="button" gutterBottom> Matricule Fiscale  </Typography>
      </Grid>
        <Grid item md={12}>
          <Typography variant="body1" gutterBottom> {client.identifiant_fiscale}  </Typography>
        </Grid></>;
    }
  }
  console.log(location.state.client);
  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: '100vh', mx: 3 }} justifyContent="space-between">
        <CssBaseline />
        <Grid item md={3}>

          <Grid container spacing={3} component={Paper} >
            <Grid item md={12} >
              <Typography component="h1" variant="h3"> {client.nom} {client.prenom}</Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="body2" gutterBottom> {client.adresse} <LocationOnIcon color="secondary" /></Typography>
            </Grid>
            <Grid item md={12}>
              <Grid container sx={{}} spacing={-10}>
                <Grid item md={7}>
                  <Button color="secondary" sx={{}} variant="contained"> Ajouter aux favoris </Button>
                </Grid>
                <Grid item md={3}  >
                  <IconButton onClick={handleClick} color="default" variant="contained">   <MoreHorizIcon /> </IconButton>
                  {/**code for menu */}
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      <EditIcon />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      <DeleteIcon />
                      Supprimer
                    </MenuItem>

                  </StyledMenu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={1}>
                <Grid item md={12}>
                <Divider sx={{ borderBottomWidth: 1, width: '100%' }} />
                  <Typography variant="h6" gutterBottom> Informations Génerale  </Typography>
                </Grid>
              
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Nom   </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.nom} </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Prénom   </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.prenom} </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Email  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.email}  </Typography>
                </Grid>

                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Date de naissance  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.birthDate}    </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom>Numéro Mobile  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.numMobile}  </Typography>
                </Grid>

                <Grid item md={12}>
                  <Typography variant="button" gutterBottom>Numéro Bureau  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.phoneBureau}  </Typography>
                </Grid>

                <Divider sx={{ borderBottomWidth: 1, width: '100%' }} />
                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom> Informations Monétaire </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Type Client  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {TypeClient[client.typeClient]}  </Typography>
                </Grid>
                {Proper()}
                <Divider sx={{ borderBottomWidth: 1, width: '100%' }} />
                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom> Adresse: </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Code Postale  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {client.codePostale}  </Typography>
                </Grid>

                <Grid item md={12}>
                  <Typography variant="button" gutterBottom> Gouvernorats  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1" gutterBottom> {Gouvernorats[client.gouvernorats]}    </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="button" gutterBottom>Adresse  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="body1"  paragraph> {client.adresse}  </Typography>
                </Grid>
              </Grid>
            </Grid>
         

          </Grid>
        </Grid>
        <Grid item md={8}  >
          <Grid container spacing={3}>
            <Grid item md={12} >
              <Tabs value={value} sx={{ width: "100%" }} onChange={handleChange} aria-label="icon label tabs example">
                <Tab onClick={() => { setNavigator("Generale") }} icon={<AccountBalanceRoundedIcon />} label="Générale" />
                <Tab onClick={() => { setNavigator("Historique") }} icon={<HistoryIcon />} label="Historique" />
                <Tab onClick={() => { setNavigator("Bon") }} icon={<ReceiptIcon />} label="Bon de réception" />
                <Tab onClick={() => { setNavigator("Commande") }} icon={<GetAppIcon />} label="Commande" />
                <Tab onClick={() => { setNavigator("Facture") }} icon={<ReceiptLongIcon />} label="Facture" />

              </Tabs>
            </Grid>
            <Grid item md={12}>
              <Grid container>
                {getProper()}
              </Grid>
            </Grid>


          </Grid>


        </Grid>

      </Grid>
    </ThemeProvider>
  )
}

export default DetailsClient