import {  Grid  } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PersonPinIcon from '@mui/icons-material/PersonPin';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Profile from './Profile';
import Commande from './Commande';
import Password from './Password';
import Compte from './Compte';
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../../redux/Navigator'
import { increment } from '../../../redux/Tab'
import AuthService from '../../../Services/AuthServices'
import UserService from '../../../Services/UserService'


export default function ProfileUser() {
  const [user, setUser] = React.useState('');

  const current = AuthService.getCurrentUser().email;
  const handlesubmit = async (current) => {
   
     
   
    return await (await UserService.getUser(current)).data;
    
  }
  


  const page2 = useSelector((state) => state.navigator.value)
  const value2 = useSelector((state) => state.tab.value)
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const ok= handlesubmit(current).then((res)=>{setUser(res)});
   
    
   },[])
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  function getProper(page) {

    switch (page) {
  
      case "profile": return <Profile user={user} />
      case "compte": return <Compte user={user}/>
      case "passe": return <Password user={user}/>
      case "commande": return <Commande user={user}/>
      default: return <Profile user={user}/>
  
    }
  }
  return (
    <Grid container spacing={5} elevation={1} >

      <Grid item md={12} sx={{ my: 4, ml: 4 }}>

        <Tabs
          value={value2}

          aria-label="icon position tabs example"
        >

          <Tab onClick={() => { dispatch(change("profile")); dispatch(increment(0)) }} icon={<PersonPinIcon />} iconPosition="end" label={"Profile"} />
          <Tab onClick={() => { dispatch(change("compte")); dispatch(increment(1)) }} icon={<ManageAccountsIcon />} iconPosition="end" label="Mon Compte" />
          <Tab onClick={() => { dispatch(change("passe")); dispatch(increment(2)) }} icon={<LockIcon />} iconPosition="end" label="Changer mot de passe" />
          <Tab onClick={() => { dispatch(change("commande")); dispatch(increment(3)) }} icon={<ReceiptIcon />} iconPosition="end" label="Commande" />
        </Tabs>
      </Grid>
      <Grid item md={12}>
        {getProper(page2)}
      </Grid>

    </Grid>
  )
}
