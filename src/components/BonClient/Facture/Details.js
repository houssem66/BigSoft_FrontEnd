import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailsBon from '../../BonFournisseur/BonReception/DetailsBon'
import FactureService from '../../../Services/BonClient/FactureClientService';
import authService from "../../../Services/AuthServices";

function Details() {
  let navig = useNavigate()
  let location = useLocation();
  const [facture, setfacture] = useState('');
  useEffect(() => {
    // console.log("it works",   ) 
    if (Number.isInteger(location.state.Facture)) {
      let params = { include: "BonLivraisonClient.Grossiste,BonLivraisonClient.Client,DetailsFactures,BonLivraisonClient.DetailsLivraisons.Produit" }
      params.idP = location.state.Facture
      FactureService.GetList(params).then(
        (res) => {
          setfacture(res.data[0].bonLivraisonClient	);
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
    }
    else {
      if (location.state.Facture.detailsFactures) {
        setfacture(location.state.Facture.bonLivraisonClient)
      }
      else {
        setfacture(location.state.Facture);
      }
    }



  }, [location])


  return (
    <>
      {(facture) ?
        (

          <DetailsBon selector={"Client"} title="Facture" bon={facture}></DetailsBon>
        )
        : (
          <div>not ok</div>
        )
      }
    </>)
}

export default Details