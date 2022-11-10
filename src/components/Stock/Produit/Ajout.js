import { Alert, Grid } from "@mui/material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import ProduitService from '../../../Services/Stock/ProduitService';
import Select from '../../FormsUI/Select'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../FormsUI/Textfields'
import DateTimePicker from '../../FormsUI/DataTimePicker'
import Button from '../../FormsUI/Button'
import { Button as Butt } from '@mui/material';
import TVAList from '../../../Data/TVA.json'
import UnitOfMeasure from '../../../Data/UnitOfMeasure.json'
import Category from '../../../Data/Category.json'

function Ajout() {
    const [PrixHT, setPrixHt] = React.useState('');
    const [TVA, setTVA] = React.useState('');
    const [Unit, setUnit] = React.useState('');
    let tax = []
    let cat=[]
    let unit=[]
    unit=Object.values(UnitOfMeasure)
    console.log(tax)
    const INITIAL_FORM_STATE = {
        productName: '',
        barcode: '',
        description: '',
        priceHT: '',
        tva: '',
        category: '',
        unitOfMeasure: '',

    };
    const FORM_VALIDATION = Yup.object().shape({
        productName: Yup.string().required('required'),
        barcode: Yup.string().required('required'),
        description: Yup.string().required('required'),
        priceHT: Yup.number().required('required'),
        tva: Yup.string()
            .required('Required'),
        unitOfMeasure: Yup.string().required("required"),
        category: Yup.string().required("required"),


    });



    // Grab values and submitForm from context

    const AutoSubmitToken = () => {
        const { values, submitForm } = useFormikContext();

        React.useEffect(() => {

            if (values.priceHT != null) {
                setPrixHt(values.priceHT);
                setTVA(values.tva)
                setUnit(values.unitOfMeasure)
            }

        });
    };

    let navigate = useNavigate();


    const annuler = (e) => {
        navigate("/feed/product");

    }
    function CalculatePrixTTC() {
       
        if (PrixHT > 0) {
            if (TVA > 0) {
                let x = (parseFloat(TVA) / 100) * parseFloat(PrixHT) + parseFloat(PrixHT)
            //  let  s=x.toFixed(2)
                return x
            }
            else if (TVA == 0) {
                let x = parseFloat(PrixHT).toFixed(2)
              //let s=x.toFixed(2)
                return x
            }

        }
        return 0
    }
    const handlesubmit = async (client) => {


        try {
            await ProduitService.ajout(client).then(
                (response) => {

                    navigate("/feed/product");
                    window.location.reload();
                },
                (error) => {
                   
                }
            );
        } catch (err) {
           
        }

    }
    return (
        <Formik initialValues={{
            ...INITIAL_FORM_STATE
        }}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                handlesubmit(values);
            }}

        >
            <Form>
                <AutoSubmitToken />
                <Grid container component="main" sx={{ mx: 3, my: 2, maxWidth: "90%" }} direction="row" spacing={4} alignItems="flex-start" justifyContent="space-between"  >
                    <Grid md={12} item>
                        <Typography component="h1" variant="h5">
                           Add product
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2, }} spacing={5} container square>
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                    General informatio,:
                                </Typography>
                            </Grid>

                            <Grid md={6} item>
                                <Textfield
                                    name="productName"
                                    label="Product name"
                                />
                            </Grid>
                            <Grid md={6} item >
                                <Textfield
                                    name="barcode"
                                    label="Barcode"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent="flex-start" spacing={4}
                                    alignItems="flex-start">

                                    <Grid item md={6} >
                                        <Textfield
                                            name="description"
                                            label="Description"
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>
                                    <Grid item md={4} >
                                        <Select
                                            name="category"
                                            label="Category"
                                            options={Category}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>




                        </Grid>
                    </Grid>

                    <Grid item md={12}>
                        <Grid justifyContent="space-between" sx={{ my: 2 }} spacing={5} container  >
                            <Grid item md={12} >
                                <Typography variant="button" display="block" gutterBottom>
                                 Monitary   Information :
                                </Typography>
                            </Grid>
                            <Grid item md={2} >
                                <Textfield
                                    name="priceHT"
                                    label="hors tax Price"
                                />
                            </Grid>
                            <Grid item md={3} >
                                <Select
                                    name="tva"
                                    label="TVA"
                                    options={TVAList}
                                />
                            </Grid>
                            <Grid item md={2} >
                                <Select
                                    name="unitOfMeasure"
                                    label="Unité of mesure"
                                    options={UnitOfMeasure}
                                />
                            </Grid>
                            <Grid item md={5} >
                                <Alert severity="success">price TTC: <strong>{(CalculatePrixTTC() < 1) ? (<div></div>) : (CalculatePrixTTC())} TND  of {unit[Unit]}</strong> </Alert>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid container
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Grid item >
                                <Butt variant='contained' color="error" onClick={() => { annuler() }} >
                                    Cancel
                                </Butt>
                            </Grid>
                            <Grid item >
                                <Button >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default Ajout