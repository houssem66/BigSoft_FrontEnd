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
    if (location.state.Facture) {
      console.log(location.state.Facture)
      FactureService.GetById(location.state.Facture).then(
        (res) => {
          setfacture(res.data.bonLivraisonClient);
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

  }, [location])
 

  return (
    <>
      {(facture) ?
        (

          <DetailsBon selector={"Client"} title="Invoice" bon={facture}></DetailsBon>
        )
        : (
          <div>not ok</div>
        )
      }
    </>)
}

export default Details