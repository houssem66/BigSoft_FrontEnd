import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonReceptionService from '../../../Services/BonFournisseur/BonReceptionService'

import Edit from './EditBon';

function EditBonReception() {
  let location = useLocation();
  let navig = useNavigate();
  const [listFournisseur, SetlistFournisseur] = useState([]);
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
  const [bon, SetBon] = useState('')

  useEffect(() => {
    if (location.state.Bon) {
      BonReceptionService.GetById(location.state.Bon).then(
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

  }, [location])
  useEffect(() => {
    if (bon.detailsReceptions) {
      let aux = []
      bon.detailsReceptions.forEach(element => {
        let ojb = { idProduit: element.idProduit, quantite: element.quantite }
        aux.push(ojb)
      });
      SetDetailsBonReceptionModels(aux);
    }
  }, [bon])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authService.getCurrentUser();

    let aux = {
      id: bon.id,
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
    <>{(listFournisseur && bon && (detailsBonReceptionModels)) ?
      (<Edit bon={bon}
        Fournisseur={Fournisseur}
        setFournisseur={setFournisseur}
        detailsBonReceptionModels={detailsBonReceptionModels}
        SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
        selector="Fournisseur" handleSubmit={handleSubmit}
        listFournisseur={listFournisseur} title="Bon de réception"
      >
      </Edit>)
      : (<div>Edit</div>)}</>
  )
}

export default EditBonReception