import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/ClientService'
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/BonLivraisonService'
import AjoutL from '../../BonFournisseur/BonReception/Ajout';
function Ajout() {
    let navig = useNavigate();
    const [listFournisseur, SetlistFournisseur] = useState([]);
    const [Fournisseur, setFournisseur] = useState('');
    const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = authService.getCurrentUser();
console.log("client",Fournisseur.id)
        let aux = {
            clientId: Fournisseur.id,
            grossisteId: user.id,
            date: new Date(),
            detailsLivraisonsModel: detailsBonReceptionModels
        }

        try {
            await BonLivraison.ajout(aux).then(
                (response) => {

                    navig("/feed/deliveryOrder");
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
                title=" Bon de livraison"
                Fournisseur={Fournisseur}
                setFournisseur={setFournisseur}
                detailsBonReceptionModels={detailsBonReceptionModels}
                SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
                selector="Client" handleSubmit={handleSubmit} listFournisseur={listFournisseur}
                client={true}
                ></AjoutL>)
            : (<div>ajout</div>)}</>
    )
}

export default Ajout