import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailsBon from '../BonReception/DetailsBon';
import FactureService from '../../../Services/BonFournisseur/FactureService';
import authService from "../../../Services/AuthServices";
function Details() {
  let navig=useNavigate()
  let location = useLocation();
  const [facture, setfacture] = useState('');
  useEffect(() => {
    if (location.state.Facture) {
      FactureService.GetById(location.state.Facture).then(
        (res) => {
          setfacture(res.data.bonDeReceptionFournisseur);
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

          <DetailsBon selector={"Fournisseur"} title="Facture" bon={facture}></DetailsBon>
        )
        : (
          <div>not ok</div>
        )
      }
    </>
  )
}

export default Details