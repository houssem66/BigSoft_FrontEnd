import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import GrossisteService from '../../../Services/UserService'
import BonReceptionService from '../../../Services/BonFournisseur/BonReceptionService'

import Edit from './EditBon';

function EditBonReception() {
  let location = useLocation();
  let navig = useNavigate();
  const [listFournisseur, SetlistFournisseur] = useState([]);
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
  const [bon, SetBon] = useState()
  useEffect(() => {
    if (location.state.Bon) {
      SetBon(location.state.Bon)
      setFournisseur(location.state.Bon.fournisseur)
      let aux = []
      location.state.Bon.detailsReceptions.forEach(element => {
        let ojb = { idProduit: element.idProduit, quantite: element.quantite }
        aux.push(ojb)
      });
      SetDetailsBonReceptionModels(aux);
    }

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authService.getCurrentUser();

    let aux = {
      id:location.state.Bon.id,
      fournisseurId: Fournisseur.id,
      grossisteId: user.id,
      date: new Date(),
      DetailsBonReceptionModels: detailsBonReceptionModels
    }

    try {
      await BonReceptionService.Put(aux).then(
        (response) => {

          navig("/feed/bonReception");
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
  useEffect(() => {
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
  }, [])
  return (
    <>{(listFournisseur && bon && (detailsBonReceptionModels)) ? (<Edit bon={bon} Fournisseur={Fournisseur} setFournisseur={setFournisseur} detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} selector="Fournisseur" handleSubmit={handleSubmit} listFournisseur={listFournisseur}></Edit>) : (<div>Edit</div>)}</>
  )
}

export default EditBonReception