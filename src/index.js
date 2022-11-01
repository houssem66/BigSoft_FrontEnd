import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SignUp from './components/signUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from './components/Feed';
import Login from './components/Login/Login.js';
import Fournisseur from './components/Fournisseur/fournisseur';
import Ajouter from './components/Fournisseur/AjouteFournisseur';
import Commande from './components/Fournisseur/Commande';
import AjoutClient from './components/Client/AjoutClient';
import Client from './components/Client/Client';
import DetailsFournisseur from './components/Fournisseur/Details';
import DetailsClient from './components/Client/Details';
import EditFournisseur from './components/Fournisseur/Edit';
import EditClient from './components/Client/Edit';
import Register from './components/Grossiste/Register'
import ProfileUser from './components/Profile/User/ProfileUser';
import ProfileGrossiste from './components/Profile/Grossiste/ProfileGrossiste';
import Stock from './components/Stock/Index';
import Produit from './components/Stock/Produit/Index';
import Ajout from './components/Stock/Produit/Ajout';
import Edit from './components/Stock/Produit/Edit';
import Details from './components/Stock/Produit/Details';
// Bon Reception Fournisseur
import BonReception from './components/BonFournisseur/BonReception/BonReception';
import AjoutBon from './components/BonFournisseur/BonReception/AjoutBonReception';
import DetailsBon from './components/BonFournisseur/BonReception/DetailsBonReception';
import EditBon from './components/BonFournisseur/BonReception/EditBonReception';
//Facture Fournisseur
import FactureFournisseur from './components/BonFournisseur/Facture/index';
import DetailsFactureFournisseur from './components/BonFournisseur/Facture/Details';
//Bon Commande Fournisseur
import BonCommandeFournisseur from './components/BonFournisseur/BonCommande/index';
import AjoutBonC from './components/BonFournisseur/BonCommande/AjoutBon';
import EditBonC from './components/BonFournisseur/BonCommande/EditBon';
import DetailsC from './components/BonFournisseur/BonCommande/DetailsBon';
//Bon Livraison Client
import BonL from './components/BonClient/BonLivraison/index';
import AjoutBl from './components/BonClient/BonLivraison/Ajout';
import DetailsBL from './components/BonClient/BonLivraison/Details';
import EditBL from './components/BonClient/BonLivraison/Edit';
//Facture Client
import FactureClient from './components/BonClient/Facture/Index';
import DetailsCl from './components/BonClient/Facture/Details';
//Bon Commande CLient
import DetailsClBC from './components/BonClient/BonCommande/Details';
import AjoutCLBC from './components/BonClient/BonCommande/Ajout';
import EditBoncl from './components/BonClient/BonCommande/Edit';
import BonCommandeCl from './components/BonClient/BonCommande/Index';
//Bon Sortie Client
import DetailsClBS from './components/BonClient/BonSortie/Details';
import AjoutCLBS from './components/BonClient/BonSortie/Ajout';
import EditClBS from './components/BonClient/BonSortie/Edit';
import BonSortieCl from './components/BonClient/BonSortie/Index';
//Devis Client
import DetailsClD from './components/BonClient/Devis/Details';
import AjoutCLD from './components/BonClient/Devis/Ajout';
import EditClD from './components/BonClient/Devis/Edit';
import DevisCl from './components/BonClient/Devis/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>

    <Routes>
      {/**Sprint 1 routing */}
      <Route path="/create" element={<SignUp />}></Route>
     
      <Route path="/login" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
     
      <Route path="/" element={<App />}>
        <Route path="feed" element={<Feed />}>
          <Route path="profileUser" element={<ProfileUser />}></Route>
          <Route path="profileGrossiste" element={<ProfileGrossiste />}></Route>
          <Route path="fournisseur" element={<Fournisseur />} />
          <Route path="ajouterFourni" element={<Ajouter />} />
          <Route path="editFournisseur/" element={<EditFournisseur />} />
          <Route path="commande" element={<Commande />} />
          <Route path="detailsFournisseur" element={<DetailsFournisseur />} />
          <Route path="ajouterClient" element={<AjoutClient />} />

          <Route path="client" element={<Client />} />
          <Route path="detailsClient" element={<DetailsClient />} />
          <Route path="editClient" element={<EditClient />} />

          <Route path="stock" element={<Stock />} />
          <Route path="produit" element={<Produit />} />
          <Route path="produit_ajout" element={<Ajout />} />
          <Route path="produit_edit" element={<Edit />} />
          <Route path="produit_details" element={<Details />} />
       

          <Route path="bonReception" element={<BonReception />}></Route>
          <Route path="bonReception_ajout" element={<AjoutBon />}></Route>
          <Route path="bonReception_details" element={<DetailsBon />}></Route>
          <Route path="bonReception_edit" element={<EditBon />}></Route>

          <Route path="factureFournisseur" element={<FactureFournisseur />}></Route>
          <Route path="factureFournisseur_details" element={<DetailsFactureFournisseur />}></Route>

          <Route path="bonCommandeFournisseur" element={<BonCommandeFournisseur />}></Route>
          <Route path="bonCommandeFournisseur_ajout" element={<AjoutBonC />}></Route>
          <Route path="bonCommandeFournisseur_details" element={<DetailsC />}></Route>
          <Route path="bonCommandeFournisseur_edit" element={<EditBonC />}></Route>

          <Route path="bonLivraison" element={<BonL />}></Route>
          <Route path="bonLivraison_ajout" element={<AjoutBl />}></Route>
          <Route path="bonLivraison_details" element={<DetailsBL />}></Route>
          <Route path="bonLivraison_edit" element={<EditBL />}></Route>
          
          <Route path="factureClient" element={<FactureClient />}></Route>
          <Route path="factureClient_details" element={<DetailsCl />}></Route>

          <Route path="bonCommandeClient" element={<BonCommandeCl />}></Route>
          <Route path="bonCommandeClient_ajout" element={<AjoutCLBC />}></Route>
          <Route path="bonCommandeClient_details" element={<DetailsClBC />}></Route>
          <Route path="bonCommandeClient_edit" element={<EditBoncl />}></Route>

          <Route path="bonSortie" element={<BonSortieCl />}></Route>
          <Route path="bonSortie_ajout" element={<AjoutCLBS />}></Route>
          <Route path="bonSortie_details" element={<DetailsClBS />}></Route>
          <Route path="bonSortie_edit" element={<EditClBS />}></Route>

          <Route path="devis_details" element={<DetailsClD />}></Route>
          <Route path="devis_ajout" element={<AjoutCLD />}></Route>
          <Route path="devis_edit" element={<EditClD />}></Route>
          <Route path="devis" element={<DevisCl />}></Route>



        </Route>


      </Route>

    </Routes>

  </BrowserRouter>

);


