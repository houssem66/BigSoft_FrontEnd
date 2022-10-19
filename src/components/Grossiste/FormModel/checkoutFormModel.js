export default {
    formId: 'checkoutForm',
    formfield: {
        nom: {
            name: 'nom',
            label: 'Nom de personne a contacter',
            requiredErrorMsg: 'Nom de personne a contacter est obligatoire'
        }, userName: {
            name: 'userName',
            label: 'User Name',
            requiredErrorMsg: 'User Name est obligatoire'
        },
        prenom: {
            name: 'prenom',
            label: 'Prenom de peronnse a contacter',
            requiredErrorMsg: 'Prenom de peronnse a contacter est obligatoire'
        },
        codePostale: {
            name: 'codePostale',
            label: 'Code Postale',
            requiredErrorMsg: 'Code Postale est obligatoire'
        },
        email: {
            name: 'email',
            label: 'Email',
            requiredErrorMsg: 'Email est obligatoire'
        },
        emailPersonneAcontact: {
            name: 'emailPersonneAcontact',
            label: 'email de Personne a Contacter',
            requiredErrorMsg: 'email de Personne a Contacter est obligatoire'
        },
        confirmPassword:{name:'confirmPassword',label:"Confirmer le Mot de passe",requiredErrorMsg:'Les mots de passe doivent correspondre'},
        passWord: {
            name: 'passWord',
            label: 'Mot de passe',
            requiredErrorMsg: 'Mot de passe est obligatoire'
        },
        numbureau: {
            name: 'numbureau',
            label: 'Numéro de bureau',
            requiredErrorMsg: 'Numéro du bureau est obligatoire'
        }, 
        numMobile: {
            name: 'numMobile',
            label: 'Numéro Mobile',
            requiredErrorMsg: 'Numéro Mobile est obligatoire'
        },
        numFax: {
            name: 'numFax',
            label: 'Numéro Fax',
           
          
        },
        adresse: {
            name: 'adresse',
            label: 'Adresse',
            requiredErrorMsg: 'Adresse est obligatoire'
        },
        birthDate: {
            name: 'birthDate',
            label: 'birthDate',
            requiredErrorMsg: 'birthDate est obligatoire'
        },
        civility: {
            name: 'civility',
            label: 'Civlity',
            requiredErrorMsg: 'civility est obligatoire'
        }, 
       
        gouvernorats: {
            name: 'gouvernorats',
            label: 'Gouvernorats',
            requiredErrorMsg: 'Gouvernorats est obligatoire'
        },
        raisonSocial: {
            name: 'raisonSocial',
            label: 'Raison Sociale',
            requiredErrorMsg: 'Raison Sociale est obligatoire',
        },
        identifiant_fiscale: {
            name: 'identifiant_fiscale',
            label: ' Identifiant fiscale',
            requiredErrorMsg: ' Identifiant fiscale est obligatoire',
            invalidErrorMsg:'Identifiant fiscale est invalide(e.g 12345678X)'
        },
        rib: {
            name: 'rib',
            label: ' Rib',
            invalidErrorMsg:'Rib est invalide doit etre un nombre et avec la longeur 20 chiffre'
        } ,
        siteWeb: {
            name: 'siteWeb',
            label: ' SiteWeb',
            requiredErrorMsg: ' SiteWeb  est obligatoire',
            invalidErrorMsg:'le siteWeb est invalide'
        }

    }
};