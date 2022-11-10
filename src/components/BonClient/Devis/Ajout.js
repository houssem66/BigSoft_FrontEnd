import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/ClientService'
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/DevisService'
import AjoutL from '../../BonFournisseur/BonReception/Ajout';
function Ajout() {
  let navig = useNavigate();
  const [listFournisseur, SetlistFournisseur] = useState([]);
  const [Fournisseur, setFournisseur] = useState('');
  const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
  const handleSubmit = async (event) => {
      event.preventDefault();
      const user = authService.getCurrentUser();
      let aux = {
          clientId: Fournisseur.id,
          grossisteId: user.id,
          date: new Date(),
          DetailsDevisModels: detailsBonReceptionModels
      }

      try {
          await BonLivraison.ajout(aux).then(
              (response) => {

                 navig("/feed/salesQuotes");
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
    <>{(listFournisseur) ?
      (<AjoutL
          title="Sales Quotes"
          Fournisseur={Fournisseur}
          setFournisseur={setFournisseur}
          detailsBonReceptionModels={detailsBonReceptionModels}
          SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
          selector="Client" handleSubmit={handleSubmit} listFournisseur={listFournisseur}
         
          ></AjoutL>)
      : (<div>ajout</div>)}</>
  )
}

export default Ajout