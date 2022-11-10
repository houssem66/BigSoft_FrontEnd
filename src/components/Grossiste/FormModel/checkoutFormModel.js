export default {
    formId: 'checkoutForm',
    formfield: {
        nom: {
            name: 'nom',
            label: 'Nom de personne a contacter',
            requiredErrorMsg: 'Name is required'
        }, userName: {
            name: 'userName',
            label: 'User Name',
            requiredErrorMsg: 'UserName is required'
        },
        prenom: {
            name: 'prenom',
            label: 'Prenom de peronnse a contacter',
            requiredErrorMsg: 'this is required'
        },
        codePostale: {
            name: 'codePostale',
            label: 'Code Postale',
            requiredErrorMsg: 'this is required'
        },
        email: {
            name: 'email',
            label: 'Email',
            requiredErrorMsg: 'this is required'
        },
        emailPersonneAcontact: {
            name: 'emailPersonneAcontact',
            label: 'email de Personne a Contacter',
            requiredErrorMsg: 'this is required'
        },
        confirmPassword:{name:'confirmPassword',label:"Confirme Password",requiredErrorMsg:'this is required'},
        passWord: {
            name: 'passWord',
            label: 'Mot de passe',
            requiredErrorMsg: 'this is required'
        },
        numbureau: {
            name: 'numbureau',
            label: 'Numéro de bureau',
            requiredErrorMsg: 'this is required'
        }, 
        numMobile: {
            name: 'numMobile',
            label: 'Numéro Mobile',
            requiredErrorMsg: 'this is required'
        },
        numFax: {
            name: 'numFax',
            label: 'Numéro Fax',
           
          
        },
        adresse: {
            name: 'adresse',
            label: 'Adresse',
            requiredErrorMsg: 'this is required'
        },
        birthDate: {
            name: 'birthDate',
            label: 'birthDate',
            requiredErrorMsg: 'this is required'
        },
        civility: {
            name: 'civility',
            label: 'Civlity',
            requiredErrorMsg: 'this is required'
        }, 
       
        gouvernorats: {
            name: 'gouvernorats',
            label: 'Gouvernorats',
            requiredErrorMsg: 'this is required'
        },
        raisonSocial: {
            name: 'raisonSocial',
            label: 'Raison Sociale',
            requiredErrorMsg: 'this is required',
        },
        identifiant_fiscale: {
            name: 'identifiant_fiscale',
            label: ' Identifiant fiscale',
            requiredErrorMsg: ' this is required',
            invalidErrorMsg:'Identifiant fiscale is invalid(e.g 12345678X)'
        },
        rib: {
            name: 'rib',
            label: ' Rib',
            invalidErrorMsg:'Rib is invalide must be a number and with length 20 digits'
        } ,
        siteWeb: {
            name: 'siteWeb',
            label: ' SiteWeb',
            requiredErrorMsg: ' SiteWeb  is required',
            invalidErrorMsg:'le siteWeb is invalid'
        }

    }
};