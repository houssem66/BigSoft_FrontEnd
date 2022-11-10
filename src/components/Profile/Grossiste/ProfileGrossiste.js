import { Grid } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PersonPinIcon from '@mui/icons-material/PersonPin';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Profile from './Profile';
import Password from './PassWord';
import Compte from './Compte';
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../../redux/GrossisteNavigator'
import { increment } from '../../../redux/GrossisteTab'
import AuthService from '../../../Services/AuthServices'
import UserService from '../../../Services/UserService'
function ProfileGrossiste() {
  const [Grossiste, setGrossiste] = React.useState('');
  const current = AuthService.getCurrentUser().email;
  const dispatch = useDispatch()
  const handlesubmit = async (current) => {



    return await (await UserService.getUser(current)).data;

  }
  React.useEffect(() => {
    const ok = handlesubmit(current).then((res) => { setGrossiste(res) });


  }, [])
  const page = useSelector((state) => state.GrossisteNavigator.value)
  const value = useSelector((state) => state.GrossisteTab.value)
  function getProper(page) {

    switch (page) {
  
      case "profile": return <Profile Grossiste={Grossiste} />
      case "compte": return <Compte Grossiste={Grossiste}/>
      case "passe": return <Password Grossiste={Grossiste}/>
      default: return <Profile Grossiste={Grossiste}/>
  
    }
  }
  return (
    <Grid container spacing={5} elevation={1} >

    <Grid item md={12} sx={{ my: 4, ml: 4 }}>

      <Tabs
        value={value}

        aria-label="icon position tabs example"
      >

        <Tab onClick={() => { dispatch(change("profile")); dispatch(increment(0)) }} icon={<PersonPinIcon />} iconPosition="end" label={"Profil"} />
        <Tab onClick={() => { dispatch(change("compte")); dispatch(increment(1)) }} icon={<ManageAccountsIcon />} iconPosition="end" label="Account" />
        <Tab onClick={() => { dispatch(change("passe")); dispatch(increment(2)) }} icon={<LockIcon />} iconPosition="end" label="Change Password" />
        
      </Tabs>
    </Grid>
    <Grid item md={12}>
      {getProper(page)}
    </Grid>

  </Grid>
  )
}

export default ProfileGrossiste