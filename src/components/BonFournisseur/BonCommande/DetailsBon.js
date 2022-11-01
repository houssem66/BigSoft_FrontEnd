import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Details from '../BonReception/DetailsBon'
function DetailsBon() {
    let location = useLocation()
    const[bon,SetBon]=useState()
    useEffect(()=>{
     
        SetBon(location.state.Bon)
    },[location])
  return (
    <>
    <Details selector={"Fournisseur"} title="Bon de commande" bon={bon}></Details>
    </>
  )
}

export default DetailsBon