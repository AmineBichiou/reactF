import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FullLayout from '../components/layouts/FullLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import {
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from '../components/baseCard/BaseCard';

const UpdateResponse = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [idProb, setIdProb] = useState(localStorage.getItem("idProb"));


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/response/${id}`)
      .then(response => {
        const { solution, dateCreated, dateModified, user, problem } = response.data;
        setSolution(solution);
        setDateCreated(dateCreated);
        setDateModified(dateModified);
        setUser(user);
        setProblem(problem);
        console.log(response.data);
      })
      .catch(error => console.log(error));
      
     

  }, [id]);

  const [solution, setSolution] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dateModified, setDateModified] = useState(new Date().toISOString().slice(0, 10) );
  const [user, setUser] = useState('');
  const [problem, setProblem] = useState('');

  const handleSolutionChange = event => {
    setSolution(event.target.value);
  };

  const handleDateCreatedChange = event => {
    setDateCreated(event.target.value);
  };

  const handleDateModifiedChange = event => {
    setDateModified(event.target.value);
  };

  const handleUserChange = event => {
    setUser(event.target.value);
  };

  const handleProblemChange = event => {
    setProblem(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = new URLSearchParams();
    data.append('solution', solution);
    data.append('dateModified', dateModified);

    axios.put(`http://127.0.0.1:8000/response/${id}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => {
        console.log(response);
        history('/showResponse/'+idProb);
      })
      .catch(error => console.log(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Update Response">
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ marginTop: '-50px', paddingTop: '10px' }}>
              <TextField
                id="solution"
                label="Solution"
                multiline
              rows={4}
                required
                value={solution}
                onChange={handleSolutionChange}
              />

            </Stack>
            <br />
            <Button type="submit" variant="contained">
              Update Response
            </Button>
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  </FullLayout>
</ThemeProvider>

  );
};

export default UpdateResponse;
