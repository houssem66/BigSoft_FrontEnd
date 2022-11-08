import { Box } from '@mui/system';
import Bon from '../BonClient/Facture/Index'
function Facture({iDC}) {
  return (
    <>{(iDC)?( <Box sx={{ ml: -23 }}>
      <Bon iDC={iDC} />

    </Box>):(<div>not ok</div>)}</>
   
 
  )
}

export default Facture