import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Outlet } from "react-router-dom";
import BreadCrumb from './AppBreadCrumb';
import { CssBaseline } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Feed = () => {
    return (


        <Grid Container component="main" >
             <CssBaseline />
                <BreadCrumb></BreadCrumb>
              
            <Outlet />
           
            <Copyright sx={{ pt: 4 }} />
          
        </Grid>


    );
}

export default Feed;