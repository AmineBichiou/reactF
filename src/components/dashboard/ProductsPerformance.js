import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import pimg from '../../assets/img/860814.png';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { useParams } from "react-router-dom";
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
import ProductPag from "../pagination/ProductPag";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/

const ProductsPerformance = () => {
  const { id } = useParams();
  const [Problems, setProblems] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(2);
 
  
   useEffect(() => {
    Axios.get('http://127.0.0.1:8000/problems').then((response) => {
      setProblems(response.data);
      console.log(response.data);
     });
    Axios.get('http://127.0.0.1:8000/home').then((response) => {
    setDevelopers(response.data.users);
      console.log(response.data);
   });
   
   }, [id]);


  
  const deleteProblem = (id) => {
    Axios.delete(`http://127.0.0.1:8000/problems/${id}`);
    console.log(id);
  }
 

  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddProduct');
  };
  const handleDelete = (id) => {
    //deleteProduct(id);
    window.location.reload();
  };
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Problems Perfomance">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Problmes</Button>
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
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                developer
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
          
          {Problems.map((p) => (
            <TableRow key={p.title}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {p.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                  
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    <img  src='../../assets/users/1.jpg' />
                      {p.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {developers.find(d => d.id === p.user)?.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
              <Typography variant="h6">{p.description}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {developers.find(d => d.id === p.user)?.email}
                </Typography>
              </TableCell>
              
              
              
              <TableCell>
              <Typography variant="h6">{p.dateCreated}</Typography>
              </TableCell>
              <TableCell>
              <Typography variant="h6">{p.dateModified}</Typography>
              </TableCell>
              
              <TableCell  >
              <Link to={`updateProduct/${p.id}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => { 
    deleteProblem(p.id);
    alert("Button clicked!"); 
    window.location.reload();
}} style={{ border: 'none', background: 'none' }} ><DeleteOutlineIcon/></button>
              {/*onClick={handleDelete}*/}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <br/>
      <ProductPag postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/> */}
      
    </BaseCard>
  );
};

export default ProductsPerformance;
