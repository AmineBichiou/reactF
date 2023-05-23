import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import BaseCard from "../baseCard/BaseCard";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import test from '../../assets/img/Image_not_available.png';

import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardMedia, CardContent, Typography, Button, TextField, Box } from '@mui/material';

const ExampleCard = () => {
  const { id } = useParams();
  const [Problems, setProblems] = useState([]);
  const [Developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState([]);

  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/problems').then((response) => {
      setProblems(response.data);
      console.log(response.data);
    });

    Axios.get('http://127.0.0.1:8000/home').then((response) => {
      setDevelopers(response.data);
      console.log(response.data);
    });
  }, [id]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterProblems();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);
  const [problemToUpdate, setProblemToUpdate] = useState(null);

  const openDeleteConfirmation = (problem) => {
    setProblemToDelete(problem);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setProblemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const openUpdateConfirmation = (problem) => {
    setProblemToUpdate(problem);
    setUpdateConfirmationOpen(true);
  };

  const closeUpdateConfirmation = () => {
    setProblemToUpdate(null);
    setUpdateConfirmationOpen(false);
  };

  const navigate = useNavigate();

  const confirmDeleteProblem = () => {
    console.log("im here" + problemToDelete);
    if (problemToDelete) {
      Axios.delete(`http://127.0.0.1:8000/problems/${problemToDelete.id}`)
        .then(() => {
          console.log("Problem deleted successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting problem:", error);
        });
    }

    closeDeleteConfirmation();
  };

  const handleNavigate = (id) => {
    navigate(`/showResponse/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/updateProblem/${id}`);
  };

  const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
  };

  const images = importAll(require.context('../../assets/users', false, /.(png|jpe?g|svg)$/));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterProblems = () => {
    const filtered = Problems.filter((problem) => {
      const titleMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch;
    });

    setFilteredProblems(filtered);
  };
  const userRole = localStorage.getItem('role');
  const isAdminUser = userRole === 'ROLE_ADMIN,ROLE_USER';

  return (
    <Box maxWidth="1200px" margin="0 auto">
      <TextField
        label="Search by Title or Description"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: "20px", marginLeft: "20%", width: "80%" }}
      />

      <BaseCard title="Here are some Problems">
        {filteredProblems.map((p) => (
          <Card key={p.id} sx={{ display: '', flexDirection: '', marginBottom: '20px' }}>
          <CardMedia
              component="img"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
              image={p.image ? images['./' + p.image] : test}
              alt={p.image ? '' : 'Fallback Image'}
            />
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '3rem', color: 'red', textAlign: 'center' }}>
                <b>{p.title}</b>
              </Typography>

              <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '1.5rem', color: 'black', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                <div>{p.description}</div>
              </Typography>

              <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem', marginLeft: '70%', marginTop: '70%' }}>
                <div>Created Date: {new Date(p.dateCreated).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
              </Typography>

              <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem', marginLeft: '70%' }}>
                <div>Edited Date: {new Date(p.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: '1.5rem' }}
                  onClick={() => handleNavigate(p.id)}
                >
                  Solutions
                </Button>
                {isAdminUser && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ fontSize: '1.5rem' }}
                  onClick={() => openDeleteConfirmation(p)}
                >
                  Delete
                </Button>
                )}
                {isAdminUser && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: '1.5rem' }}
                  onClick={() => handleUpdate(p.id)}
                >
                  Update
                </Button>
                )}
              </Box>

              <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure you want to delete this problem?</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDeleteConfirmation} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={confirmDeleteProblem} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </BaseCard>
    </Box>
  );
};

export default ExampleCard;
