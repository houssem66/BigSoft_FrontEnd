import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailsBon from '../../BonFournisseur/BonReception/DetailsBon'
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/BonLivraisonService'
function Details() {
  let location = useLocation()
  let navig=useNavigate()
  const[bon,SetBon]=useState()
  useEffect(()=>{
    BonLivraison.GetById(location.state.Bon).then(
      (res) => {
          SetBon(res.data);
        
      },
      (error) => {
          console.log("Private page", error.response);
          // Invalid token
          if (error.response && error.response.status === 403) {
              authService.logout();
              navig("/login");
              window.location.reload();
          }
      }
  );
  },[location])
  return (
    <>
        <DetailsBon selector={"Client"} title="Bon de Livraison" bon={bon}></DetailsBon>
        </>
  )
}

export default Details