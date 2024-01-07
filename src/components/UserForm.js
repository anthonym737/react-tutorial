import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UserForm from "./UserForm";
import UserService from "../services/UserService";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  export default function UserForm(props) {
    const { user, onSubmit, onCancel } = props;
  
    return (
      <Box sx={style}>
        <Formik
          initialValues={user ?? {}}
          onSubmit={async (values) => {
            // ToDO call function from UserService
            console.log(values);
            if (user) {
              // edit
              await UserService.editUser(values);
            } else {
              // add
              await UserService.createUser(values);
            }
  
            onSubmit();
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Grid
                container
                style={{ color: "blue" }}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <ModeEditIcon />
                </Grid>
                <Grid item md style={{ position: "relative", left: "5px" }}>
                  {user ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
                </Grid>
              </Grid>
              <hr />
              <Grid container>
                <Grid item md>
                  <Typography variant="subtitle1" style={{ color: "blue" }}>
                    Nom
                  </Typography>
                  <TextField
                    required
                    label="Nom"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="lastName"
                  />
                </Grid>
                <Grid item md>
                  <Typography variant="subtitle1" style={{ color: "blue" }}>
                    Prénom
                  </Typography>
                  <TextField
                    required
                    label="Prénom"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="firstName"
                  />
                </Grid>
  
                <Grid item md>
                  <Typography variant="subtitle1" style={{ color: "blue" }}>
                    Email
                  </Typography>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="email"
                    style={{ width: "468px" }}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid item md>
                  <Button
                    type="submit"
                    style={{
                      background: "blue",
                      borderRadius: "20px",
                      height: "40px",
                      float: "right",
                      position: "relative",
                      label: "Value",
                      color: "white",
                    }}
                  >
                    {user ? "Modifier" : "Ajouter"}
                  </Button>
                </Grid>
                <Grid item md>
                  <Button
                    style={{
                      borderRadius: "20px",
                      height: "40px",
                      float: "right",
                      position: "relative",
                      label: "Value",
                    }}
                    onClick={() => onCancel()}
                  >
                    Annuler
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }

