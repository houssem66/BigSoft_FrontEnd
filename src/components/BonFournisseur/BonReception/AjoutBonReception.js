import React, { useEffect, useState } from 'react'
import FournisseurService from '../../../Services/FournisseurService'
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthServices";

import Ajout from './Ajout';

function AjoutBonReception() {
    let navig = useNavigate();
    const [list, SetList] = useState([]);
    useEffect(() => {
        FournisseurService.GetList().then(
            (res) => {

                SetList(res.data);

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
        <>{(list)?(<Ajout selector="Fournisseur" list={list}></Ajout>):(<div>ajout</div>)}</>
    )
}

export default AjoutBonReception