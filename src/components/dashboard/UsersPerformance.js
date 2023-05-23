import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid, Pagination, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Fab,
  ButtonGroup,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const UsersPerformance = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      const res = await axios.get('http://127.0.0.1:8000/home');
      setDevelopers(res.data.users);
      setLoading(false);
    };
    fetchDevelopers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/home/${deleteUserId}`);
      const updatedDevelopers = developers.filter(dev => dev.id !== deleteUserId);
      setDevelopers(updatedDevelopers);
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      alert('Error deleting user');
    }
  };

  const navigate = useNavigate();
  const handleAddDeveloper = () => {
    navigate('/AddUser');
  };

  const handleOpenDialog = (id) => {
    setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const userRole = localStorage.getItem('role');
  const isAdminUser = userRole === 'ROLE_ADMIN,ROLE_USER';

  if (!isAdminUser) {
    return (
      <Alert severity="error">You do not have permission to access this page.</Alert>
    );
  }

  return (
    <BaseCard title="Developers Performance">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px", marginTop: "-50px" }}>
        <Button variant="contained" color="primary" onClick={handleAddDeveloper}>Add Developer</Button>
      </div>
      <div>
        <Table
          aria-label="simple table"
          sx={{
            mt: -5,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Role
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {developers.map(dev => (
              <TableRow key={dev.roles}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {dev.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        <Avatar alt={dev.email} src="src/assets/users/user.jpg" />
                        {dev.roles}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={dev.email}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(dev.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDeleteUser} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </BaseCard>
  );
};

export default UsersPerformance;
