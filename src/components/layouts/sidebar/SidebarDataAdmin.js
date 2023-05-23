import React from 'react'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
export const SidebarDataAdmin = [
    {
        title:"MainPage",
        icon: <CategoryIcon />,
        link:"/Main"
    },
    
    

    {
        title:"Any Problems?",
        icon: <Inventory2OutlinedIcon />,
        link:"/AddProblem"
    },

    
    
   

];
const userRole = localStorage.getItem('role');

if (userRole === 'ROLE_ADMIN,ROLE_USER') {
  SidebarDataAdmin.splice(1, 0, {
    title: "Userinfo",
    icon: <ManageAccountsOutlinedIcon />,
    link: "/User"
  });
}
export default SidebarDataAdmin; 
