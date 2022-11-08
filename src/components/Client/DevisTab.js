import { Box } from '@mui/system';
import Bon from '../BonClient/BonLivraison/index'
function Commande({iDC}) {
  return (
    <>{(iDC)?( <Box sx={{ ml: -23 }}>
      <Bon iDC={iDC} />

    </Box>):(<div>not ok</div>)}</>
   
  );
}

export default Commande