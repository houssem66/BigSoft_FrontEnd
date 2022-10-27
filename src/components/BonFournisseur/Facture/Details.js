import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DetailsBon from '../BonReception/DetailsBon';

function Details() {
  let location = useLocation();
  const [facture, setfacture] = useState('');
  useEffect(() => {
    if (location.state.Facture.detailsFactures) {
      console.log("ok")
      setfacture(location.state.Facture.bonDeReceptionFournisseur)
    }
    else {
      setfacture(location.state.Facture);
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