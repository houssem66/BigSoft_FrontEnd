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
    if (Number.isInteger(location.state.Facture)){
      let params = { include: "BonDeReceptionFournisseur.Fournisseur,BonDeReceptionFournisseur.Grossiste,DetailsFactures,BonDeReceptionFournisseur.DetailsReceptions.Produit" }
      params.idP = location.state.Facture
      FactureService.GetList(params).then(
        (res) => {
          console.log(res.data[0].bonDeReceptionFournisseur)
         setfacture(res.data[0].bonDeReceptionFournisseur	);
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
    }else 
    {
      if (location.state.Facture.detailsFactures) {
        console.log("ok")
        setfacture(location.state.Facture.bonDeReceptionFournisseur)
      }
      else {
        console.log("notok")
        setfacture(location.state.Facture);
      }
  
    }
   

  }, [location])
  console.log("facture", facture)

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