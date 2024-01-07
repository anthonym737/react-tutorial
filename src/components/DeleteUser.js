import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserService from "../services/UserService";

export default function DeleteUser(props) {
    const { user, onSubmit, onCancel } = props;
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "white",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  
    const validateDelete = async () => {
      await UserService.deleteUser(user);
      onSubmit();
    };
  
    return (
      <Box sx={style}>
        <Grid container>
          <p>Voulez-vous supprimer l'utilisateur?</p>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              style={{
                background: "blue",
                borderRadius: "20px",
                height: "40px",
                float: "right",
                position: "relative",
                label: "Value",
                color: "white",
              }}
              onClick={() => validateDelete()}
            >
              Valider
            </Button>
            <Button onClick={() => onCancel()}>Annuler</Button>
          </Grid>
        </Grid>
      </Box>
    );
  }