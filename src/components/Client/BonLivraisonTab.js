import { Box } from '@mui/system';
import Bon from '../BonClient/BonSortie/Index'
function BonReception(iDC) {
  return (
    <>{(iDC)?( <Box sx={{ ml: -23 }}>
      <Bon iDC={iDC} />

    </Box>):(<div>not ok</div>)}</> )
}

export default BonReception