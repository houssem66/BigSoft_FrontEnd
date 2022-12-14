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



//SetListDetails(FilteredList.splice(FilteredList.indexOf(row),1))

function TableC({ detailsBonReceptionModels, SetDetailsBonReceptionModels, listDetailsProp, selector,client }) {

    const [ListProduits, SetListProduits] = useState([]);
    const [ListDetails, SetListDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let TotaleHt = (ListDetails) ? (priceTotaleHT(ListDetails)) : (priceTotaleHT([]));
    const TotaleTTc = (ListDetails) ? (priceTotaleTTC(ListDetails)) : (priceTotaleTTC([]));
    const FilteredProduitList = ListProduits.filter((el) => {
        return !(ListDetails.some((f) => {
            return f.produit.id === el.id
        }))
    });
    function priceTotaleTTC(list) {
        let sum = 0;
    
        if (list) {
            if (list) { }
            list.map((row) => {
                sum += row.produit.priceTTc * row.quantite
            })
        }

        return sum+0.600
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
    function DeleteRow(row) {
        const auxDetails = ListDetails.filter((x) => x.produit.id !== row.produit.id)
        const auxDetailsModel = detailsBonReceptionModels.filter((x) => x.idProduit !== row.produit.id)
        SetListDetails(auxDetails);
        SetDetailsBonReceptionModels(auxDetailsModel);
    }
   
    useEffect(() => {
       let params={include:"StockProduit"}
        ProduitService.GetList(params).then((res) => {
            SetListProduits(res.data);
        })
    }, [])
    useEffect(() => {
        if (listDetailsProp) {
            SetListDetails(listDetailsProp)
        }

    }, [listDetailsProp])
 
    return (<>{(selector) ? (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={5}>
                        Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Unit priceTTC</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">AmounttHT</TableCell>
                    <TableCell align="right">TVA</TableCell>
                    <TableCell align="right">AmountTTC</TableCell>
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
                    <TableCell colSpan={4} align="right">Total HT</TableCell>
                    <TableCell colSpan={1} align="right">{ccyFormat(TotaleHt)}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell colSpan={4} align="right">Tax stamp</TableCell>
                    <TableCell align="right">0.600</TableCell>
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
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                <TableRow>

                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Unit priceTTC</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">AmountHT</TableCell>
                    <TableCell align="right">TVA</TableCell>
                    <TableCell align="right">AmountTTC</TableCell>
                    <TableCell align="right"></TableCell>


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
                        <TableCell align="right" sx={{ width: "10%" }}><Button variant='contained' color='error' onClick={() => { DeleteRow(row) }}>Supprimer</Button></TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={3} align="center"><Button variant="contained" onClick={handleOpen}>Add purchase</Button></TableCell>
                    <Modale
                     detailsBonReceptionModels={detailsBonReceptionModels} 
                     SetDetailsBonReceptionModels={SetDetailsBonReceptionModels} 
                     ListProduits={FilteredProduitList} SetListProduits={SetListProduits} 
                     client={client}
                     handleClose={handleClose} SetListDetails={SetListDetails} ListDetails={ListDetails}
                      open={open} ></Modale>
                </TableRow>
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={4} align="right">Total HT</TableCell>
                    <TableCell colSpan={1} align="right">{ccyFormat(TotaleHt)}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell colSpan={4} align="right">tax stamp</TableCell>
                    <TableCell align="right">0.600</TableCell>
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