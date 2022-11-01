import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/ClientService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/DevisService'
import EditBon from '../../BonFournisseur/BonReception/EditBon';
function Edit() {
  let location = useLocation();
  let navig = useNavigate();
  const [listFournisseur, SetlistFournisseur] = useState([]);
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
  const [bon, SetBon] = useState('')
  useEffect(() => {
    if (location.state.Bon.detailsDevis) {
      SetBon(location.state.Bon)
      setFournisseur(location.state.Bon.client)
      let aux = []
      location.state.Bon.detailsDevis.forEach(element => {
        let ojb = { idProduit: element.idProduit, quantite: element.quantite }
        aux.push(ojb)
      });
      SetDetailsBonReceptionModels(aux);
    }

  }, [])
  console.log(location.state.Bon)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authService.getCurrentUser();

    let aux = {
      id: location.state.Bon.id,
      clientId: Fournisseur.id,
      grossisteId: user.id,
      date: new Date(),
      DetailsDevisModels: detailsBonReceptionModels
    }

    try {
      await BonLivraison.Put(aux).then(
        (response) => {

          navig("/feed/devis");
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
      (<EditBon bon={bon}
        title="devis"
        Fournisseur={Fournisseur}
        setFournisseur={setFournisseur}
        detailsBonReceptionModels={detailsBonReceptionModels}
        SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
        selector="Client" handleSubmit={handleSubmit}
        listFournisseur={listFournisseur}

      >
      </EditBon>)
      : (<div>ss</div>)}</>
  )
}

export default Edit