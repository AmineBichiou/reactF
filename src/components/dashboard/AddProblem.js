import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import FullLayout from "../layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../theme/theme";

import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Input,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const AddProblems = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().slice(0, 10));
  const [dateModified, setDateModified] = useState("");
  const userid = localStorage.getItem('id');
  const [user, setUser] = useState(userid);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateCreatedChange = (event) => {
    setDateCreated(event.target.value);
  };

  const handleDateModifiedChange = (event) => {
    setDateModified(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("dateCreated", dateCreated);
      formData.append("dateModified", dateModified);
      formData.append("user", user);
      formData.append("image", image);

      const response = await Axios.post(
        "http://127.0.0.1:8000/problems",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/Main");
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the problem.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} lg={6}>
        <BaseCard title="Add Problem">
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                fullWidth
                required
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                required
                multiline
                rows={4}
              />
              
              <label htmlFor="image">Image</label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                variant="outlined"
                onChange={handleImageChange}
                sx={{
                  display: "none",
                }}
              />
              <label htmlFor="image">
                <Button component="span">
                  Upload Image
                </Button>
              </label>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  </FullLayout>
</ThemeProvider>

  );
};

export default AddProblems;
