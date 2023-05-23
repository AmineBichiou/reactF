import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/home').then((response) => {
      console.log(response.data);
      const roles = response.data.roles;
      setUserRole(roles);
    });
  }, [id]);

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios
      .post('http://127.0.0.1:8000/login', formData)
      .then((response) => {
        // handle successful login
        console.log(' i m here ' + response.data);
        localStorage.setItem('email', email);
        localStorage.setItem('role', response.data.roles);
        localStorage.setItem('id', response.data.id);
        history('/Main');
      })
      .catch((error) => {
        // handle login error
        console.error('Error logging in', error);
        setError(true);
      });
  };

  return (
    <html>
<body>
    

    <div class="signupFrm">
      {error ? (
        <Alert severity="error" onClose={() => setError(false)}>
          Invalid email or password. Please try again.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} class="form">
          <h2 class="title">Login</h2>
          <div class="inputContainer">
            <label style={{ marginRight: '20px' }}>Email:</label>
            <TextField type="email" 
            
            style={{ marginRight: '20px' }}
            value={email} 
            onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div class="inputContainer">
          <label style={{ marginTop: '20px' }}>Password:</label>
            <TextField type="password"   value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <Button type="submit" class="submitBtn"  style={{ marginRight: '20px' }}value="Sign up">
            Submit
          </Button>
          <Button type="button" class="submitBtn"style={{ marginRight: '20px' }} onClick={() => history('/AddU')}>
            Register
          </Button>
        </form>
      )}
    </div>
  </body>

</html>

  );
}

export default LoginPage;
