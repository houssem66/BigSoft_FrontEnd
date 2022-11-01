import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DetailsBon from '../../BonFournisseur/BonReception/DetailsBon'
function Details() {
  let location = useLocation()
  const[bon,SetBon]=useState()
  useEffect(()=>{
   
      SetBon(location.state.Bon)
  },[location])
  return (
    <>
    <DetailsBon selector={"Client"} title="Bon de Sortie" bon={bon}></DetailsBon>
    </>
  )
}

export default Details