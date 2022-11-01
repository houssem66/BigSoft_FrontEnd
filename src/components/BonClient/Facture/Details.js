import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DetailsBon from '../../BonFournisseur/BonReception/DetailsBon'
function Details() {
  let location = useLocation();
  const [facture, setfacture] = useState('');
  useEffect(() => {
    if (location.state.Facture.detailsFactures) {
      console.log("ok")
      setfacture(location.state.Facture.bonLivraisonClient)
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

          <DetailsBon selector={"Client"} title="Facture" bon={facture}></DetailsBon>
        )
        : (
          <div>not ok</div>
        )
      }
    </>  )
}

export default Details