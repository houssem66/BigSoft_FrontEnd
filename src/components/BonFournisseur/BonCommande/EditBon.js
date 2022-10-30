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
    SetBon(location.state.Bon)

    setFournisseur(location.state.Bon.fournisseur)
    let aux = []
    location.state.Bon.detailsCommandes.forEach(element => {
      let ojb = { idProduit: element.idProduit, quantite: element.quantite }
      aux.push(ojb)
    });
    SetDetailsBonReceptionModels(aux);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = authService.getCurrentUser();

    let aux = {
      id: location.state.Bon.id,
      fournisseurId: Fournisseur.id,
      grossisteId: user.id,
      date: new Date(),
      DetailsBonCommandes: detailsBonReceptionModels
    }

    try {
      await BonCommandeService.Put(aux).then(
        (response) => {

          navig("/feed/bonCommandeFournisseur");
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