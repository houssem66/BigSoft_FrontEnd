import { Box } from '@mui/system';
import Bon from '../BonFournisseur/Facture/index'
const Facture = ({iDC}) => {
    return (<>{(iDC)?( <Box sx={{ ml: -23 }}>
        <Bon iDC={iDC} />
  
      </Box>):(<div>not ok</div>)}</> );
}
 
export default Facture ;  