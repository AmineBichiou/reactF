import React,{useState,useEffect} from "react";
import { useParams} from "react-router-dom";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import pimg from '../../assets/img/860814.png';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
 import './pag.css';
import {
  Grid,
  Button,
 
  Stack,
  
  Fab,
  ButtonGroup,
} from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import axios from "axios";
import CustomPag from "../pagination/CustomPag";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/


const Response = () => {
  const { id } = useParams();
  const [Problems, setProblems] = useState([]);
  const [Responses, setResponses] = useState([]);
  const [Developers, setDevelopers] = useState([]);
  const [loading, setLoading] =useState(false);
  const [postsPerPage , setPostsPerPage]=useState(5);
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/response').then((response) => {
    setResponses(response.data);
      console.log(response.data);
   });

   Axios.get('http://127.0.0.1:8000/problems').then((response) => {
    setProblems(response.data);
      console.log(response.data);
   });
   Axios.get('http://127.0.0.1:8000/home').then((response) => {
    setDevelopers(response.data);
      console.log(response.data);
   });
    }, [id]);
  
  const deleteResponse = (id) => {
    Axios.delete(`http://127.0.0.1:8000/response/${id}`);
    console.log(id);
  }
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddResponse');
  };

  // function handleDelete = async (id) =>{
  //   try{
  //     await axios.delete
  //   }

  // }
 
  return (
    <BaseCard title="Response">
     <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Response</Button>
      </div>
      <Table
        aria-label="simple table"
        sx={{
          mt: -5,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
  
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Solution
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                dateCreated
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                dateModified
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Problem
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email of Developer
              </Typography>
            </TableCell>
            
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Responses.map((res) => (
            <TableRow key={res.solution}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {res.solution}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {res.dateCreated}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {res.dateModified}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {Problems.find(p => p.id === res.problem)?.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {Developers.find(d => d.id === res.user)?.email}
                </Typography>
              </TableCell>
              
              <TableCell  >
              <Link to={`updateResponse/${res.id}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => {deleteResponse(res.id)}}  style={{ border: 'none', background: 'none' }}  ><DeleteOutlineIcon/></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </BaseCard>
  );
};

export default Response;
