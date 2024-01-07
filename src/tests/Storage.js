import BasicSnackBar from "./BasicSnackBar";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

const Storage = () => {

    const [open, setOpen] = useState(false);
  

    
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    return (
        <>
            This is a storage page
            <Button 
                variant="contained" 
                onClick={handleClick}
            >
                Open success snackbar
            </Button>
        
            <BasicSnackBar
                open={open} 
                onClose={handleClose}
                severity="warning"
                message="success msg"
            />
        </>
    )
}

export default Storage