import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DetailsBon from './DetailsBon'

function DetailsBonReception() {
    let location = useLocation()
    const[bon,SetBon]=useState()
    useEffect(()=>{
     
        SetBon(location.state.Bon)
    },[location])
    return (
        <>
        <DetailsBon selector={"Fournisseur"} bon={bon}></DetailsBon>
        </>
    )
}

export default DetailsBonReception          