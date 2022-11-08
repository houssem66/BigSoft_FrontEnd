import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Details from '../BonReception/DetailsBon'
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonFournisseur/BonCommandeService'
function DetailsBon() {
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
    <Details selector={"Fournisseur"} title="Bon de commande" bon={bon}></Details>
    </>
  )
}

export default DetailsBon