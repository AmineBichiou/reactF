import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BaseCard from "../components/baseCard/BaseCard";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import FullLayout from "../components/layouts/FullLayout";

const ShowResponses = () => {
  const { id } = useParams();
  const [Problems, setProblems] = useState([]);
  const [Responses, setResponses] = useState([]);
  const [Developers, setDevelopers] = useState([]);
  const [thisId, setThisId] = useState(id);
  const idProb = localStorage.setItem("idProb",id);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/problems`).then((response) => {
      setProblems(response.data);
      console.log(response.data);
    });

    Axios.get(`http://127.0.0.1:8000/response`).then((response) => {
      setResponses(response.data.filter((res) => res.problem === parseInt(id)));
      console.log("is this right : " + response.data);
    });

    Axios.get(`http://127.0.0.1:8000/home`).then((response) => {
      setDevelopers(response.data.users);
      console.log(response.data);
    });
  }, [id]);

  const deleteResponse = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this response?");
    if (confirmDelete) {
      Axios.delete(`http://127.0.0.1:8000/response/${id}`)
        .then(() => {
          console.log(id);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/AddResponse/${id}`);
  };

  const cardStyle = {
    marginBottom: "20px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  };


  const userRole = localStorage.getItem('role');
  const isAdminUser = userRole === 'ROLE_ADMIN,ROLE_USER';
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
    <BaseCard title="Response">
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px", marginTop: "-50px" }}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Add Response
        </Button>
      </Box>

      {Responses.map((res) => (
        <Card key={res.solution} sx={cardStyle}>
          <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "left" }}>
  Solution: {res.solution}
</Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Problem: {Problems.find((p) => p.id === res.problem)?.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email of Developer: {Developers.find((d) => d.id === res.user)?.email}
            </Typography>
            <Typography variant="subtitle2" >
            <div>Date Created :{new Date(res.dateCreated).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
            </Typography>
            <Typography variant="subtitle2" >
             <div>Date Modified: {new Date(res.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              {isAdminUser && (
                <Link to={`updateResponse/${res.id}`} style={{ textDecoration: "none", marginRight: "10px" }}>
                <ModeEditIcon />
              </Link>
              )}
                  
                  {isAdminUser && (
                    <button onClick={() => deleteResponse(res.id)} style={{ border: "none", background: "none" }}>
                      <DeleteOutlineIcon />
                    </button>
                  )}
                </Box>
          </CardContent>
        </Card>
      ))}
    </BaseCard>
    </FullLayout>
    </ThemeProvider>


  );
};

export default ShowResponses;
