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




        </Route>


      </Route>

    </Routes>

  </BrowserRouter>

);


