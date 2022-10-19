import checkoutFormModel from './checkoutFormModel';
import * as Yup from 'yup';
import UserService from '../../../Services/UserService';
const { formfield: { userName, adresse,
    birthDate,
    civility,
    codePostale,
    email,
    emailPersonneAcontact,
    gouvernorats,
    identifiant_fiscale,
    nom,
    numFax,
    numMobile,
    numbureau,
    passWord,
    prenom,
    raisonSocial,
    rib,
    siteWeb,
    documents,
    confirmPassword
} } = checkoutFormModel;

export default [

    Yup.object().shape({
        [raisonSocial.name]: Yup.string().required(raisonSocial.requiredErrorMsg),
        [userName.name]: Yup.string().required(userName.requiredErrorMsg).test('Unique Email', 'UserName already in use', function (value) {
            return new Promise((resolve, reject) => { UserService.getUserbyUserName(value).then((res) => { resolve(false) }).catch((error) => { console.log(error.response); resolve(true); }) })
        }),
        [email.name]: Yup.string().email('Invalid email.').required(email.requiredErrorMsg).test('Unique Email', 'Email already in use', function (value) {
            return new Promise((resolve, reject) => { UserService.getUser(value).then((res) => { resolve(false) }).catch((error) => { console.log(error.response); resolve(true); }) })
        }),
        [passWord.name]: Yup.string().required(passWord.requiredErrorMsg).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/, "Must be a In this format 21754318hH@."),
        [confirmPassword.name]: Yup.string()
            .oneOf([Yup.ref(passWord.name), null], 'Les mots de passe doivent correspondre'),

    }),
    Yup.object().shape({
        [adresse.name]: Yup.string().required(adresse.requiredErrorMsg),
     
        [gouvernorats.name]: Yup.string().required(gouvernorats.requiredErrorMsg),
        [numFax.name]: Yup.number().integer().typeError('Please enter a valid phone number').required(numFax.requiredErrorMsg),
        [codePostale.name]: Yup.string().length(4).matches(/^([0-9]+)$/, "must be a number").required(codePostale.requiredErrorMsg),
        [rib.name]: Yup.string().min(20, 'length must be 20').max(20, 'length must be 20').matches(/^([0-9]+)$/, "must be a number").required(codePostale.requiredErrorMsg),
        [identifiant_fiscale.name]: Yup.string().required("required").matches(/^[0-9]{8}[A-Za-z]$/, "Must be a In this format 12345678X."),
        [siteWeb.name]: Yup.string().required(siteWeb.requiredErrorMsg).matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            siteWeb.invalidErrorMsg
        ),
    }),
    Yup.object().shape({
        [nom.name]: Yup.string().required(nom.requiredErrorMsg),
        [prenom.name]: Yup.string().required('required'),
        [civility.name]: Yup.string().required('required'),
        [numMobile.name]: Yup.number().integer().typeError('Please enter a valid phone number').required(numMobile.requiredErrorMsg),
        [numbureau.name]: Yup.number().integer().typeError('Please enter a valid phone number').required(numbureau.requiredErrorMsg),
        [emailPersonneAcontact.name]: Yup.string().email('Invalid email.').required(emailPersonneAcontact.requiredErrorMsg),
        [birthDate.name]: Yup.date().required(birthDate.requiredErrorMsg),
    })

];