import { createTheme } from '@mui/material';
import React from 'react'
const theme = createTheme({
    typography: {
      button: {
        color: "#808080"
      }, body1: {
        fontWeight: "600"
      },
    },
  });
function Stock() {
  return (
    <div>Stock</div>
  )
}

export default Stock