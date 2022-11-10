import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonCommandeService from '../../../Services/BonFournisseur/BonCommandeService'
import Edit from '../BonReception/EditBon';



function EditBon() {
  let navig = useNavigate();
  let location = useLocation();
  const [listFournisseur, SetlistFournisseur] = useState([]);
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
  const [bon, SetBon] = useState('')
  useEffect(() => {
    if (location.state.Bon) {
      BonCommandeService.GetById(location.state.Bon).then(
          (res) => {
              SetBon(res.data);
              setFournisseur(res.data.fournisseur)
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
  
    FournisseurService.GetList().then(
      (res) => {

        SetlistFournisseur(res.data);

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
  }, [location])
  useEffect(()=>{
    if ( bon.detailsCommandes){
        let aux = []
    bon.detailsCommandes.forEach(element => {
        let ojb = { idProduit: element.idProduit, quantite: element.quantite }
        aux.push(ojb)
    });
    SetDetailsBonReceptionModels(aux);
    }    

},[bon])
  useEffect(()=>{
    if ( bon.detailsCommandes){
        let aux = []
    bon.detailsCommandes.forEach(element => {
        let ojb = { idProduit: element.idProduit, quantite: element.quantite }
        aux.push(ojb)
    });
    SetDetailsBonReceptionModels(aux);
    }    

},[bon])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authService.getCurrentUser();

    let aux = {
      id: bon.id,
      fournisseurId: Fournisseur.id,
      grossisteId: user.id,
      date: new Date(),
      DetailsBonCommandes: detailsBonReceptionModels
    }

    try {
      await BonCommandeService.Put(aux).then(
        (response) => {

          navig("/feed/purchaseOrder");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>{(listFournisseur && bon && (detailsBonReceptionModels)) ?
      (<Edit bon={bon}
        title="Purchase Order"
        Fournisseur={Fournisseur}
        setFournisseur={setFournisseur}
        detailsBonReceptionModels={detailsBonReceptionModels}
        SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
        selector="Fournisseur" handleSubmit={handleSubmit}
        listFournisseur={listFournisseur}>
      </Edit>)
      : (<div>Edit</div>)}</>
  )
}

export default EditBon