import { Box } from '@mui/system';
import Bon from '../BonClient/BonCommande/Index'
function Generale({ iDC}) {
  return (
    <>{(iDC)?( <Box sx={{ ml: -23 }}>
      <Bon iDC={iDC} />

    </Box>):(<div>not ok</div>)}</>
   
  );

}

export default Generale