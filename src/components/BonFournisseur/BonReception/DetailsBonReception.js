import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DetailsBon from './DetailsBon'

function DetailsBonReception() {
    let location = useLocation()
    const[bon,SetBon]=useState()
    useEffect(()=>{
     
        SetBon(location.state.Bon)
    },[location])
    return (
        <>{(bon)?(  <DetailsBon selector={"Fournisseur"} title="Bon de réception" bon={bon}></DetailsBon>)
            :(<div></div>)}
      
        </>
    )
}

export default DetailsBonReception          