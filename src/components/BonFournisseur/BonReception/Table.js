import React, { useState } from 'react'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Table } from '@mui/material';
import Modale from './Modale'
import { useEffect } from 'react';
import ProduitService from '../../../Services/Stock/ProduitService'

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}





function TableC({ detailsBonReceptionModels, SetDetailsBonReceptionModels, list }) {

    function priceTotaleTTC(list) {
        let sum = 0;
        if (list) {
            if (list) { }
            list.map((row) => {
                sum += row.produit.priceHt * row.quantite
            })
        }

        return sum
    } function priceTotaleHT(list) {
        let sum = 0;
        if (list) {
            if (list) { }
            list.map((row) => {
                sum += row.produit.priceHt * row.quantite
            })
        }

        return sum
    }

    const [ListProduits, SetListProduits] = useState([]);
    const [ListDetails, SetListDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let TotaleHt = (ListDetails) ? (priceTotaleHT(ListDetails)) : (0);
    const TotaleTTc = (ListDetails) ? (priceTotaleTTC(ListDetails)) : (0);
    useEffect(() => {
        ProduitService.GetList().then((res) => {

            SetListProduits(res.data);
        })

    }, [])
    useEffect(() => {
        if (list) {
            SetListDetails(list)
        }

    }, [list])

    //  const fileteredList = ListProduits.filter(item => ListDetails.includes(details => details.product))
    return (<>{(list) ? (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={5}>
                        Details
                    </TableCell>
                    <TableCell align="right">Prix</TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>Nom Produit</TableCell>
                    <TableCell align="right">Prix UnitTTC</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">MontantHT</TableCell>
                    <TableCell align="right">TVA</TableCell>
                    <TableCell align="right">MontantTTC</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ListDetails.map((row) => (
                    <TableRow key={row.produit}>
                        <TableCell>{row.produit.productName}</TableCell>
                        <TableCell align="right">{row.produit.priceTTc}</TableCell>
                        <TableCell align="right">{row.quantite}</TableCell>
                        <TableCell align="right">{ccyFormat(row.produit.priceHt * row.quantite)}</TableCell>
                        <TableCell align="right">{row.produit.tva}</TableCell>
                        <TableCell align="right">{ccyFormat(row.produit.priceTTc * row.quantite)}</TableCell>
                    </TableRow>
                ))}

                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={4} align="right">Totale HT</TableCell>
                    <TableCell colSpan={1} align="right">{ccyFormat(TotaleHt)}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell colSpan={4} align="right">Total TTC</TableCell>
                    <TableCell align="right">{ccyFormat(TotaleTTc)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>) : (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={5}>
                        Details
                    </TableCell>
                    <TableCell align="right">Prix</TableCell>
                </TableRow>
                <TableRow>
                
                    <TableCell>Nom Produit</TableCell>
                    <TableCell align="right">Prix UnitTTC</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">MontantHT</TableCell>
                    <TableCell align="right">TVA</TableCell>
                    <TableCell align="right">MontantTTC</TableCell>
                   

                </TableRow>
            </TableHead>
            <TableBody>
                {ListDetails.map((row) => (
                    <TableRow key={row.produit}>
                        <TableCell>{row.produit.productName}</TableCell>
                        <TableCell align="right">{row.produit.priceTTc}</TableCell>
                        <TableCell align="right">{row.quantite}</TableCell>
                        <TableCell align="right">{ccyFormat(row.produit.priceHt * row.quantite)}</TableCell>
                        <TableCell align="right">{row.produit.tva}</TableCell>
                        <TableCell align="right">{ccyFormat(row.produit.priceTTc * row.quantite)}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={3} align="center"><Button variant="contained" onClick={handleOpen}>ajouter Produit</Button></TableCell>
                    <Modale detailsBonReceptionModels={detailsBonReceptionModels} SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} ListProduits={ListProduits} SetListProduits={SetListProduits} handleClose={handleClose} SetListDetails={SetListDetails} ListDetails={ListDetails} open={open} ></Modale>
                </TableRow>
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={4} align="right">Totale HT</TableCell>
                    <TableCell colSpan={1} align="right">{ccyFormat(TotaleHt)}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell colSpan={4} align="right">Total TTC</TableCell>
                    <TableCell align="right">{ccyFormat(TotaleTTc)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)}</>

    )
}

export default TableC