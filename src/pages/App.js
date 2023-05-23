import './App.css';
import BaseCard from '../components/baseCard/BaseCard';
import { SidebarDataAdmin } from '../components/layouts/sidebar/SidebarDataAdmin';
import Sidebar from '../components/layouts/sidebar/SidebarAdmin';
import SidebarUser from '../components/layouts/sidebar/SidebarUser';
import FullLayout from '../components/layouts/FullLayout';
import SidebarAdmin from '../components/layouts/sidebar/SidebarAdmin';
import UserTable from './UserTable';
import createEmotionCache from '../createEmotionCache';
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from '../theme/theme';
import ProductTable from './ProductTable';
import ShowResponses from './ShowResponses';
import ResponseTable from './ResponseTable';
import MainTable from './MainTable';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import ProductForm from '../components/dashboard/AddProblem';
import AddResponse from './AddResponse';
import AddProblem from '../components/dashboard/AddProblem';
import UpdateProduct from './ShowResponses';
import UpdateResponse from './UpdateResponse';
import UpdateProblem from './UpdateProblem';
import AddUser from './AddUser';
import AddU from './AddU';
import LoginPage from './LoginPage';
import UpdateUser from './UpdateUser';


const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  return (
    <Router>
    
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/Main' element={<MainTable/>}/>
      {localStorage.getItem('role') === 'ROLE_ADMIN,ROLE_USER' && (
     <Route path='/User' element={<UserTable/>}/>
     )}
     <Route path='/Product' element={<ProductTable/>}/>
      <Route path='/AddResponse/:id' element={<AddResponse/>}/>
      <Route path='/AddProblem' element={<AddProblem/>}/>
      {localStorage.getItem('role') === 'ROLE_ADMIN,ROLE_USER' && (
      <Route path='/AddUser' element={<AddUser/>}/>
      )}
      <Route path='/AddU' element={<AddU/>}/>
      <Route path='/showResponse/:id' element={<ShowResponses/>}/>
      {localStorage.getItem('role') === 'ROLE_ADMIN,ROLE_USER' && (
      <Route path='/showResponse/:id/updateResponse/:id' element={<UpdateResponse/>}/>
      )}
      <Route path='/User/updateUser/:id' element={<UpdateUser/>}/>
      <Route path='/updateProblem/:id' element={<UpdateProblem/>}/>
      </Routes>
       
    </Router>
  );
}
