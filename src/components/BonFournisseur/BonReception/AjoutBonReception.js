import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import GrossisteService from '../../../Services/UserService'
import BonReceptionService from '../../../Services/BonFournisseur/BonReceptionService'
import Ajout from './Ajout';

function AjoutBonReception() {
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
            DetailsBonReceptionModels: detailsBonReceptionModels
        }

        try {
            await BonReceptionService.ajout(aux).then(
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
        <>{(listFournisseur) ? (<Ajout title=" Bon de réception" Fournisseur={Fournisseur} setFournisseur={setFournisseur} detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} selector="Fournisseur" handleSubmit={handleSubmit} listFournisseur={listFournisseur}></Ajout>) : (<div>ajout</div>)}</>
    )
}

export default AjoutBonReception