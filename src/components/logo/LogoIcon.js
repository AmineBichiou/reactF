import React from "react";
import { Link } from "@mui/material";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { PersonOutline } from '@mui/icons-material';

const LogoIcon = () => {
  const email = localStorage.getItem('email');
  const user = email.split('@')[0];

  return (
    <div
      style={{
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        margin: '20px',
      }}
    >
      <PersonOutline style={{ fontSize: '40px', marginRight: '5px'  }} /><br></br>
      Hi, {user}!
      
    </div>
  );
};

export default LogoIcon;
