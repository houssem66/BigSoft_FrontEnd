import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailsBon from './DetailsBon'
import authService from "../../../Services/AuthServices";
import BonReception from '../../../Services/BonFournisseur/BonReceptionService'
function DetailsBonReception() {
    let navig=useNavigate()
    let location = useLocation()
    const[bon,SetBon]=useState()
    useEffect(()=>{
        BonReception.GetById(location.state.Bon).then(
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
        <>{(bon)?(  <DetailsBon selector={"Fournisseur"} title="Receipt order" bon={bon}></DetailsBon>)
            :(<div></div>)}
      
        </>
    )
}

export default DetailsBonReception          