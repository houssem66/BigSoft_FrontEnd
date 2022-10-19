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
import Generale from './Génrale'
import Historique from './Historique'
import Facture from './Facture'
import BonReception from './BonReception'
import Commande from './Commande'
import DeleteIcon from '@mui/icons-material/Delete';
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
const DetailsFournisseur = () => {
    const [value, setValue] = React.useState(0);
    const [navigator, setNavigator] = React.useState('Generale');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const location = useLocation();
    const [fournisseur, SetFournisseur] = React.useState(location.state.fournisseur);
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
            case "Generale": return <Generale  />
            case "Commande": return <Commande />
            case "Historique": return <Historique />
            case "Bon": return <BonReception />
            case "Facture": return <Facture />
            default: return <Generale />
        }

    }

    return (<ThemeProvider theme={theme}>

        <Grid container component="main" sx={{ height: '100vh', mx: 3 }} justifyContent="space-between">
            <CssBaseline />
            <Grid item md={3}>

                <Grid container spacing={3} component={Paper} >
                    <Grid item md={12} >
                        <Typography component="h1" variant="h3"> {fournisseur.raisonSocial}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography variant="body2" gutterBottom> {fournisseur.adresse} <LocationOnIcon color="secondary" /></Typography>
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
                                <Typography variant="h6" gutterBottom> Informations Génerale  </Typography>
                            </Grid>
                            <Divider sx={{ borderBottomWidth: 1, width: '100%' }} />
                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom> Raison sociale  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.raisonSocial} </Typography>
                            </Grid><Grid item md={12}>
                                <Typography variant="button" gutterBottom> Email  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.email}  </Typography>
                            </Grid>

                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom> Site web  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.siteWeb}    </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom>Adresse  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.adresse}  </Typography>
                            </Grid>

                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom>Numéro Fax  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.numFax}  </Typography>
                            </Grid>

                            <Divider sx={{ borderBottomWidth: 1, width: '100%' }} />
                            <Grid item md={12}>
                                <Typography variant="h6" gutterBottom> Informations sur personne a contacter </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom> Nom  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.nomPersAContact}  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom> Prénom  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.prenomPersAContact}   </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="button" gutterBottom> Numéro Bureau  </Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="body1" gutterBottom> {fournisseur.numbureau}   </Typography>
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
    </ThemeProvider>);
}

export default DetailsFournisseur;