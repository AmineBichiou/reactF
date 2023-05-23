import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';

import {
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import BaseCard from '../components/baseCard/BaseCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleReturn = () => {
    navigate('/');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

 
  function validateForm() {
    let errors = {};
    let isValid = true;

    if (email.trim() === '') {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (password.trim() === '') {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      errors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      axios.post('http://127.0.0.1:8000/register', formData)
        .then((response) => {
          console.log(response);
          if(isLoggedIn) {
            console.log(isLoggedIn);
          navigate('/User');
          } else {
            navigate('/');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error adding user');
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
              <BaseCard title="Add User">
                <form onSubmit={handleSubmit}>
                  <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }}>
                    <TextField
                      id="email"
                      label="Email"
                      value={email}
                      error={!!errors.email}
                      helperText={errors.email}
                      onChange={handleEmailChange}
                      sx={{ width: '60%' }}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={handlePasswordChange}
                      sx={{ width: '60%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={toggleShowPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      sx={{ width: '60%' }}
                    />
                  </Stack>
                  <br />
                  <Button type="submit" variant="contained" mt={0}>
                    Submit
                  </Button>
                  <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleReturn}>
                    Return
                  </Button>
                </form>
              </BaseCard>
            </Grid>
          </Grid>
    </ThemeProvider>
  );
};

export default AddUser;
