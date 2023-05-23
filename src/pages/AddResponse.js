import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import { useParams } from "react-router-dom";
import {
  Grid,
  Stack,
  TextField,
  Button,
  Autocomplete
} from "@mui/material";
import BaseCard from '../components/baseCard/BaseCard';

const AddResponse = () => {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const idProb = localStorage.setItem("idProb",id);


  const [solution, setSolution] = useState('');
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().slice(0, 10));
  const [dateModified, setDateModified] = useState("");
  const userid = localStorage.getItem('id');
  const [use, setUse] = useState(userid);
  const [problem, setProblem] = useState(id);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('solution', solution);
    formData.append('dateCreated', dateCreated);
    formData.append('dateModified', dateModified);
    formData.append('user', use);
    formData.append('problem', problem);

    try {
      await Axios.post('http://127.0.0.1:8000/response', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response added successfully');
      navigate("/showReponse/" + id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = () => {
    navigate("/showReponse/" + id);
  };

  const handleSolutionChange = event => {
    setSolution(event.target.value);
  };

  const handleProblemChange = (event, newValue) => {
    setProblems(newValue ? newValue.id : "");
  };

  const handleDateCreatedChange = event => {
    setDateCreated(event.target.value);
  };

  const handleDateModifiedChange = event => {
    setDateModified(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Response">
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    id="solution"
                    label="Solution"
                    multiline
                    rows={4}
                    value={solution}
                    onChange={handleSolutionChange}
                  />
                 

                  

                </Stack>
                <br />
                <Button type='submit' variant="contained" mt={2}>
                  Submit
                </Button>
                <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleReturn}>
                  Return
                </Button>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AddResponse;