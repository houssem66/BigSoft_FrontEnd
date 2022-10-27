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
{/*  */ }

const BreadCrumb = () => {
  function handleClick(event, value, location) {
    event.preventDefault();
    if (event.target.textContent === "home" || event.target.textContent === "") {
      navigate("/");
    }
    else {

      navigate("/feed/" + event.target.textContent);


    }
  }
  let navigate = useNavigate();
  let location = useLocation();
  const [home, sethome] = useState('/');
  const [indexPage, setindexPage] = useState('');
  const [crudPage, setcrudPage] = useState('');
  useEffect((
  ) => {
    let x = location.pathname.split("/")
    if (x){
     let y = x[2].toString().split("_")
      setindexPage(y[0]);
      setcrudPage(y[1])
    }
   
    // console.log(y)
   
  }, [location])
  function show() {
if (crudPage){

  return <Typography
  sx={{ display: 'flex', alignItems: 'center' }}
  color="text.primary"
>
  <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
  {crudPage}
</Typography>
}
   
  }
  return (<Paper>
    <Grid item md={12} sx={{ my: 4, ml: 6 }}>
      <div role="presentation" >
        <Breadcrumbs aria-label="breadcrumb">
          {(home) ? (<Link onClick={(e, value) => { handleClick(e, value, location) }}
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            home
          </Link>) : (<div></div>)}
          {(indexPage) ? (<Link onClick={(e, value) => { handleClick(e, value, location) }}
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {indexPage}
          </Link>) : (<div></div>)}
          {show()}
        </Breadcrumbs>
      </div></Grid></Paper>
  );
}

export default BreadCrumb;