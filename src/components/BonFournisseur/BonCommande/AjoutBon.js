import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonCommandeService from '../../../Services/BonFournisseur/BonCommandeService'
import Ajout from '../BonReception/Ajout';

export default function AjoutBon() {
    let navig = useNavigate();
    const [listFournisseur, SetlistFournisseur] = useState([]);
    const [Fournisseur, setFournisseur] = useState('');
    const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
    const handleSubmit = async (event) => {
        console.log(event);
        event.preventDefault();
        const user = authService.getCurrentUser();

        let aux = {
            fournisseurId: Fournisseur.id,
            grossisteId: user.id,
            date: new Date(),
            DetailsBonCommandes: detailsBonReceptionModels,
            prixTotaleTTc:0,
            prixTotaleHt:0
        }

        try {
            await BonCommandeService.ajout(aux).then(
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
        <>{(listFournisseur) ? (<Ajout title="bon de commande" Fournisseur={Fournisseur} setFournisseur={setFournisseur} detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} selector="Fournisseur" handleSubmit={handleSubmit} listFournisseur={listFournisseur}></Ajout>) : (<div>ajout</div>)}</>
    )
}
