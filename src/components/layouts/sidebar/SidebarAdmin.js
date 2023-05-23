import React from 'react';
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LogoIcon from '../../logo/LogoIcon';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import axios from 'axios';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const SidebarAdmin = () => {
  const logout = () => {
    axios.post('http://127.0.0.1:8000/logout')
      .then((response) => {
        console.log('Logged out:', response.data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  };

  return (
    <Box p={1} className="boxa" height="100%" backgroundColor="#112227" width="18%" position="fixed" top="0" left="0" bottom="0">
      <center>
        <LogoIcon />
      </center>
      <Box mt={-7}>
        <ul className="SidebarList">
          {SidebarDataAdmin.map((val, key) => {
            return (
              <li
                className="row"
                key={key}
                id={window.location.pathname === val.link ? 'active' : ''}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{' '}{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </Box>
      <Box position="absolute" bottom={3} width="97.5%">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        fullHeight
        onClick={logout}
        startIcon={<ExitToAppOutlinedIcon />}
        style={{ backgroundColor: '#112227' }}
      >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default SidebarAdmin;
