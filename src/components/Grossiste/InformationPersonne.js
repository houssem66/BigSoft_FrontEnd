import { Grid, Typography } from '@mui/material'
import React from 'react'
import Textfield from '../FormsUI/Textfields'

import Civility from '../../Data/Civility.json';
import Select from '../FormsUI/Select'
import DateTimePicker from '../FormsUI/DataTimePicker'
function InformationPersonne() {
    return (
        <Grid container spacing={3}>


            <Grid item md={12}>
                <Typography component="h1" variant="h4" align="center">
                    Person to contact
                </Typography>
            </Grid>
            <Grid item md={6} >
                <Textfield
                    name="nom"
                    label="Name "
                />
            </Grid>
            <Grid item md={6} >
                <Textfield
                    name="prenom"
                    label="LastName"
                />
            </Grid>
            <Grid item md={3} >
                <Select
                    name="civility"
                    label="Civility"
                    options={Civility}
                />
            </Grid>
            <Grid item md={9}>
                <Textfield
                    name="emailPersonneAcontact"
                    label="Email"
                />
            </Grid>

            <Grid item md={6} >
                <Textfield
                    name="numbureau"
                    label="Office number"
                />
            </Grid>
            <Grid item md={6} >
                <Textfield
                    name="numMobile"
                    label="mobile number"
                />
            </Grid>
            <Grid item md={4} >
                <DateTimePicker
                    name="birthDate"
                    label="BirthDate"
                />
            </Grid>
        </Grid>
    )
}

export default InformationPersonne