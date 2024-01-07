import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserService from "../services/UserService";

export default function ReadUser() {
    //label columns
    const columns = [
      { id: "lastname", label: "Nom", minWidth: 170 },
      { id: "firstname", label: "Prénom", minWidth: 100 },
      { id: "email", label: "Email", minWidth: 170 },
      { id: "delete", label: "" },
      { id: "update", label: "" },
    ];
  
    //search data on API
    const [rows, setRows] = React.useState([]);
  
    const fetchUsers = () => {
      UserService.getUsers().then((result) => {
        setRows(result.data);
      });
    };
  
    React.useEffect(() => {
      fetchUsers();
    }, []);
  
    // //Modal
    // //initial close User modal
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    // //open EditUser modal
    const handleOpenModal = () => setIsOpenModal(true);
    // //close EditUser modal
    const handleCloseModal = () => {
      setUser();
      setIsOpenModal(false);
    };
  
    //DeleteUser
  
    //inital close DeleteUser modal
    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
    //open DeleteUser modal
    const handleOpenDeleteUser = () => setIsOpenDeleteModal(true);
    //close DeleteUser modal
    const handleCloseDeleteUser = () => setIsOpenDeleteModal(false);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [user, setUser] = React.useState();
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <div>
        {/*AddUser Button */}
        <Button
          style={{
            background: "blue",
            borderRadius: "20px",
            height: "40px",
            float: "right",
            position: "relative",
            right: "15px",
          }}
          onClick={handleOpenModal}
        >
          <AddIcon
            style={{
              color: "white",
              position: "relative",
            }}
          ></AddIcon>
          <p style={{ color: "white" }}>Ajouter un utilisateur</p>
        </Button>
  
        {/*Show Api userlist*/}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, color: "blue" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell type="text" style={{ color: "blue" }}>
                        {row.lastName}
                      </TableCell>
                      <TableCell type="text" style={{ color: "blue" }}>
                        {row.firstName}
                      </TableCell>
                      <TableCell type="email" style={{ color: "blue" }}>
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setUser(row);
                            handleOpenDeleteUser();
                          }}
                        >
                          <Delete style={{ color: "blue" }} />
                        </Button>
                      </TableCell>
                      <TableCell style={{ color: "blue" }}>
                        <Button
                          onClick={() => {
                            setUser(row);
                            handleOpenModal();
                          }}
                        >
                          <ModeEditIcon style={{ color: "blue" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ color: "blue" }}
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Modal open={isOpenModal} onClose={() => handleCloseModal()}>
          <UserForm
            user={user}
            onCancel={() => handleCloseModal()}
            onSubmit={() => {
              handleCloseModal();
              fetchUsers();
              setPage(0);
            }}
          />
        </Modal>
        <Modal open={isOpenDeleteModal} onClose={() => handleCloseModal()}>
          <DeleteUser
            user={user}
            onCancel={() => {
              handleCloseDeleteUser();
            }}
            onSubmit={() => handleCloseDeleteUser()}
          />
        </Modal>
      </div>
    );
  }
