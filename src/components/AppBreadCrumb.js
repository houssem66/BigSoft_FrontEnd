import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const BreadCrumb = () => {
  function handleClick(event, value, location) {
    event.preventDefault();
    console.info( event.target.text);
    if (event.target.text!="home"){
      navigate("/feed/"+event.target.text);
    }
    else {
      navigate("/");
    }
  }
  let navigate =useNavigate();
  let location = useLocation();
  const [home, sethome] = useState('/');
  const [indexPage, setindexPage] = useState('');
  useEffect((
  ) => {
    let x = location.pathname.split("/")
    console.log(x);
    setindexPage(x[2]);


  }, [location])
  return (<Paper>
    <Grid item md={12} sx={{ my: 4, ml: 6 }}>
      <div role="presentation" onClick={(e, value) => { handleClick(e, value, location) }}>
        <Breadcrumbs aria-label="breadcrumb">
          {(home)?( <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
           home
          </Link>):(<div></div>)}
         {(indexPage)?( <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {indexPage}
          </Link>):(<div></div>)}
         

        </Breadcrumbs>
      </div></Grid></Paper>
  );
}

export default BreadCrumb;