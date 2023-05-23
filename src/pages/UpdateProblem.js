import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import qs from 'qs';
import {
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from '../components/baseCard/BaseCard';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';

const UpdateProblem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/problems/${id}`)
      .then(response => {
        const { title, description} = response.data;
        setTitle(title);
        setDescription(description);
        setProblem(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const options = users.map((user) => ({
    id: user.id,
    name: user.name,
  }));

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      description: description,
      user: user,
    };
    console.log(data);
  
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  
    axios.put(`http://127.0.0.1:8000/problems/${id}`, qs.stringify(data), config)
      .then(response => {
        console.log(response);
        navigate('/Main');
      })
      .catch(error => console.log(error));
  };
  const handleReturn = () => {
    navigate('/Main');
    
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
            <BaseCard title="Update Problem">
              <form onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }}>
                  <TextField
                    fullWidth
                    id="title-input"
                    label="Title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    sx={{ width: "60%" }}
                  />
                  <TextField
                    fullWidth
                    id="description-input"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{ width: "60%" }}
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

export default UpdateProblem;
