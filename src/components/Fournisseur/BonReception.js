import { Box } from '@mui/system';
import Bon from '../BonFournisseur/BonReception/BonReception'
const BonReception = ({iDC}) => {
    return ( <>{(iDC)?( <Box sx={{ ml: -23 }}>
        <Bon iDC={iDC} />
  
      </Box>):(<div>not ok</div>)}</>
    );
}
 
export default BonReception;