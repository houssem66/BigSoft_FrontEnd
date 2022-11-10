import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/ClientService'
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";
import BonLivraison from '../../../Services/BonClient/BonCommandeService'
import EditBon from '../../BonFournisseur/BonReception/EditBon';
function Edit() {
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
            clientId: Fournisseur.id,
            grossisteId: user.id,
            date: new Date(),
            DetailsBonCommandes: detailsBonReceptionModels
        }

        try {
            await BonLivraison.Put(aux).then(
                (response) => {

                    navig("/feed/bonCommandeClient");
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
                title="Purchase Order"
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