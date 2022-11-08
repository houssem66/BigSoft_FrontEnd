import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/ClientService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/BonLivraisonService'
import EditBon from '../../BonFournisseur/BonReception/EditBon';

export default function Edit() {
    let location = useLocation();
    let navig = useNavigate();
    const [listFournisseur, SetlistFournisseur] = useState([]);
    const [Fournisseur, setFournisseur] = useState('');
    const [detailsBonReceptionModels, SetDetailsBonReceptionModels] = useState([]);
    const [bon, SetBon] = useState('')
    useEffect(() => {
        if (location.state.Bon) {
            BonLivraison.GetById(location.state.Bon).then(
                (res) => {
                    SetBon(res.data);
                    setFournisseur(res.data.client)
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
        if (bon.detailsLivraisons) {
            let aux = []
            bon.detailsLivraisons.forEach(element => {
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
            clientId: Fournisseur.id,
            grossisteId: user.id,
            date: new Date(),
            detailsLivraisonsModel: detailsBonReceptionModels
        }

        try {
            await BonLivraison.Put(aux).then(
                (response) => {

                    navig("/feed/bonLivraison");
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
    console.log(location.state.Bon)
    return (
        <>{(listFournisseur && bon && (detailsBonReceptionModels)) ?
            (<EditBon bon={bon}
                title="bon de livraison"
                Fournisseur={Fournisseur}
                setFournisseur={setFournisseur}
                detailsBonReceptionModels={detailsBonReceptionModels}
                SetDetailsBonReceptionModels={SetDetailsBonReceptionModels}
                selector="Client" handleSubmit={handleSubmit}
                listFournisseur={listFournisseur}
                client={true}
            >
            </EditBon>)
            : (<div>Edit</div>)}</>
    )
}
